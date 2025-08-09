import Link from 'next/link'
import Tag from './tag'
import { ViewCounter } from './view-counter'

type BlogPost = {
  metadata: {
    title: string
    publishedAt: string
    summary: string
    image?: string
    minuteRead: string
    tags: string[]
  }
  slug: string
  content: string
}

type PageProps = {
  searchParams: { tag?: string | null }
  pageSize?: number
  includeTags?: boolean
  includeViews?: boolean
  thisYearTop5?: boolean
  posts: BlogPost[]
  viewCounts?: Record<string, number>
}

export function BlogPosts({ searchParams, pageSize = 5, includeTags = true, includeViews = true, thisYearTop5 = false, posts, viewCounts = {} }: PageProps) {
  const selectedTag = searchParams.tag ?? null
  const allBlogs = posts

  // Get unique tags from all posts
  const allTags = Array.from(
    new Set(allBlogs.flatMap((post) => post.metadata.tags || []))
  ).sort()

  // Filter posts by selected tag
  let filteredBlogs = selectedTag
    ? allBlogs.filter((post) => post.metadata.tags?.includes(selectedTag))
    : allBlogs

  // Apply thisYearTop5 filter if enabled
  if (thisYearTop5) {
    const currentYear = new Date().getFullYear()
    
    // Filter posts from current year and sort by view count in descending order
    filteredBlogs = filteredBlogs
      .filter((post) => {
        const postYear = new Date(post.metadata.publishedAt).getFullYear()
        return postYear === currentYear
      })
      .sort((a, b) => {
        const viewsA = viewCounts[a.slug] || 0
        const viewsB = viewCounts[b.slug] || 0
        return viewsB - viewsA // Descending order
      })
      .slice(0, 5) // Top 5
  } else {
    // Default sorting by publish date
    filteredBlogs = filteredBlogs.sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    )
  }

  return (
    <div>
      {includeTags && (<div className="flex gap-2 mb-8 flex-wrap">
        <Tag key={"all"} label={"all"} selectedTag={selectedTag} />
        {allTags.map((tag) => (
          <Tag key={tag} label={tag} selectedTag={selectedTag} />
        ))}
      </div>)}
      {filteredBlogs
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4 "
            href={`/blog/${post.slug}`}
          >
            <div className="flex flex-col items-start justify-between space-x-2 hover:underline">
              <p className="text-blue-700 cursor-pointer">
                {post.metadata.title}
              </p>
              <div className='flex justify-between items-center w-full !no-underline'>
                <span className="text-sm text-gray-500">
                  {new Date(post.metadata.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              {includeViews && (
                <ViewCounter slug={post.slug} increment={false} className="text-sm text-gray-500" />
              )}
              </div>
            </div>
          </Link>
        )).slice(0, thisYearTop5 ? 5 : pageSize)}
    </div>
  )
}
