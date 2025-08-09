import { NextRequest, NextResponse } from 'next/server'
import { getBlogPosts } from 'app/blog/utils'
import { featureFlags } from 'app/lib/feature-flags'
import { getAllViewCounts } from 'app/lib/views'

export async function GET(request: NextRequest) {
  // Return empty object if feature flag is disabled
  if (!featureFlags.viewCounter) {
    return NextResponse.json({})
  }

  try {
    // Get all blog post slugs
    const allBlogs = getBlogPosts()
    const slugs = allBlogs.map(post => post.slug)
    
    // Get all view counts from Redis
    const viewCounts = await getAllViewCounts(slugs)
    
    return NextResponse.json(viewCounts)
  } catch (error) {
    console.error('Error getting all view counts:', error)
    return NextResponse.json({}, { status: 500 })
  }
}
