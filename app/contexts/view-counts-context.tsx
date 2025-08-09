'use client'

import { createContext, useContext, useEffect, useState, useRef, useCallback, ReactNode } from 'react'
import { featureFlags } from 'app/lib/feature-flags'

interface ViewCountsContextType {
  viewCounts: Record<string, number>
  incrementViewCount: (slug: string) => void
  isLoading: boolean
}

const ViewCountsContext = createContext<ViewCountsContextType | undefined>(undefined)

const SESSION_STORAGE_KEY = 'blog-view-counts'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

interface ViewCountsProviderProps {
  children: ReactNode
}

export function ViewCountsProvider({ children }: ViewCountsProviderProps) {
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState(true)
  const hasInitialized = useRef(false)
  const incrementedSlugs = useRef(new Set<string>())

  // Load from session storage on mount
  useEffect(() => {
    if (!featureFlags.viewCounter) {
      setIsLoading(false)
      return
    }

    // Prevent duplicate calls in React Strict Mode
    if (hasInitialized.current) {
      return
    }
    hasInitialized.current = true

    const loadViewCounts = async () => {
      try {
        // Try to load from session storage first
        const cached = sessionStorage.getItem(SESSION_STORAGE_KEY)
        if (cached) {
          const { data, timestamp } = JSON.parse(cached)
          const now = Date.now()
          
          // Use cached data if it's less than 5 minutes old
          if (now - timestamp < CACHE_DURATION) {
            setViewCounts(data)
            setIsLoading(false)
            return
          }
        }

        // Fetch fresh data from API
        const response = await fetch('/api/views')
        if (response.ok) {
          const data = await response.json()
          setViewCounts(data)
          
          // Cache in session storage
          sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
            data,
            timestamp: Date.now()
          }))
        }
      } catch (error) {
        console.error('Error loading view counts:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadViewCounts()
  }, [])

  const incrementViewCount = useCallback(async (slug: string) => {
    if (!featureFlags.viewCounter) return

    // Prevent duplicate increments for the same slug
    if (incrementedSlugs.current.has(slug)) {
      return
    }
    
    // Mark this slug as incremented
    incrementedSlugs.current.add(slug)

    try {
      const response = await fetch(`/api/views/${slug}`, {
        method: 'POST',
      })
      
      if (response.ok) {
        const { views } = await response.json()
        
        // Update local state
        setViewCounts(prev => ({
          ...prev,
          [slug]: views
        }))
        
        // Update session storage
        const cached = sessionStorage.getItem(SESSION_STORAGE_KEY)
        if (cached) {
          const { data } = JSON.parse(cached)
          const updatedData = { ...data, [slug]: views }
          sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
            data: updatedData,
            timestamp: Date.now()
          }))
        }
      }
    } catch (error) {
      console.error('Error incrementing view count:', error)
      // Remove from incremented set on error so it can be retried
      incrementedSlugs.current.delete(slug)
    }
  }, [])

  return (
    <ViewCountsContext.Provider value={{ viewCounts, incrementViewCount, isLoading }}>
      {children}
    </ViewCountsContext.Provider>
  )
}

export function useViewCounts() {
  const context = useContext(ViewCountsContext)
  if (context === undefined) {
    throw new Error('useViewCounts must be used within a ViewCountsProvider')
  }
  return context
}
