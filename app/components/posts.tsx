import Link from 'next/link'
import { getBlogPosts } from 'app/blog/utils'
import Tag from './tag'

type PageProps = {
  searchParams: { tag?: string | null }
  pageSize?: number
  includeTags?: boolean
}

export function BlogPosts({ searchParams, pageSize = 5, includeTags = true }: PageProps) {
  const selectedTag = searchParams.tag ?? null
  const allBlogs = getBlogPosts()

  // Get unique tags from all posts
  const allTags = Array.from(
    new Set(allBlogs.flatMap((post) => post.metadata.tags || []))
  ).sort()

  // Filter posts by selected tag
  const filteredBlogs = selectedTag
    ? allBlogs.filter((post) => post.metadata.tags?.includes(selectedTag))
    : allBlogs

  return (
    <div>
      {includeTags && (<div className="flex gap-2 mb-8 flex-wrap">
        <Tag key={"all"} label={"all"} selectedTag={selectedTag} />
        {allTags.map((tag) => (
          <Tag key={tag} label={tag} selectedTag={selectedTag} />
        ))}
      </div>)}
      {filteredBlogs
        .sort(
          (a, b) =>
            new Date(b.metadata.publishedAt).getTime() -
            new Date(a.metadata.publishedAt).getTime()
        )
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="flex items-center justify-between space-x-2">
              <p className="text-blue-700 cursor-pointer">
                <span className='hover:underline '>{post.metadata.title}</span>
                <span className="ml-2 text-sm text-gray-500">
                  - {new Date(post.metadata.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </p>
            </div>
          </Link>
        )).slice(0, pageSize)}
    </div>
  )
}
