import { redis, REDIS_KEYS } from './redis'

export async function getViewCount(slug: string): Promise<number> {
  try {
    const views = await redis.get(REDIS_KEYS.VIEW_COUNT(slug))
    return Number(views) || 0
  } catch (error) {
    console.error('Error getting view count:', error)
    return 0
  }
}

export async function getAllViewCounts(slugs: string[]): Promise<Record<string, number>> {
  try {
    if (slugs.length === 0) {
      return {}
    }

    // Get all view counts in a single pipeline for better performance
    const pipeline = redis.pipeline()
    
    for (const slug of slugs) {
      pipeline.get(REDIS_KEYS.VIEW_COUNT(slug))
    }
    
    const results = await pipeline.exec()
    const viewCounts: Record<string, number> = {}
    
    slugs.forEach((slug, index) => {
      const views = results[index]
      viewCounts[slug] = Number(views) || 0
    })
    
    return viewCounts
  } catch (error) {
    console.error('Error getting all view counts:', error)
    // Return empty object with 0 views for all slugs as fallback
    return slugs.reduce((acc, slug) => {
      acc[slug] = 0
      return acc
    }, {} as Record<string, number>)
  }
}

export async function incrementViewCount(slug: string): Promise<number> {
  try {
    // Use Redis INCR command for atomic increment
    const newViews = await redis.incr(REDIS_KEYS.VIEW_COUNT(slug))
    return newViews
  } catch (error) {
    console.error('Error incrementing view count:', error)
    // Return current count as fallback
    return await getViewCount(slug)
  }
}
