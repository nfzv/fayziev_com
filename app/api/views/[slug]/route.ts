import { NextRequest, NextResponse } from 'next/server'
import { getViewCount, incrementViewCount } from 'app/lib/views'
import { featureFlags } from 'app/lib/feature-flags'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  // Return 0 views if feature flag is disabled
  if (!featureFlags.viewCounter) {
    return NextResponse.json({ views: 0 })
  }

  try {
    const slug = params.slug
    const views = await getViewCount(slug)
    
    return NextResponse.json({ views })
  } catch (error) {
    console.error('Error getting views:', error)
    return NextResponse.json({ views: 0 }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  // Return 0 views if feature flag is disabled
  if (!featureFlags.viewCounter) {
    return NextResponse.json({ views: 0 })
  }

  try {
    const slug = params.slug
    const views = await incrementViewCount(slug)
    
    return NextResponse.json({ views })
  } catch (error) {
    console.error('Error incrementing views:', error)
    const fallbackViews = await getViewCount(params.slug)
    return NextResponse.json({ views: fallbackViews }, { status: 500 })
  }
}
