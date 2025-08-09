'use client'

import { useEffect, useRef } from 'react'
import { featureFlags } from 'app/lib/feature-flags'
import { useViewCounts } from 'app/contexts/view-counts-context'

interface ViewCounterProps {
  slug: string
  increment?: boolean
  className?: string
}

export function ViewCounter({ slug, increment = false, className = "" }: ViewCounterProps) {
  const { viewCounts, incrementViewCount, isLoading } = useViewCounts()
  const hasIncremented = useRef(false)

  // Return null if feature flag is disabled
  if (!featureFlags.viewCounter) {
    return null
  }

  useEffect(() => {
    if (increment && !hasIncremented.current) {
      hasIncremented.current = true
      incrementViewCount(slug)
    }
  }, [slug, increment, incrementViewCount])

  const views = viewCounts[slug] || 0

  if (isLoading) {
    return
  }

  return (
    <span className={`${className}`}>
      {views.toLocaleString()} {views === 1 ? 'view' : 'views'}
    </span>
  )
}
