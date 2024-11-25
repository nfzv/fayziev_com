import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export function BlogPosts({ pageSize = 5 }) {
  let allBlogs = getBlogPosts()

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2 items-center">
              <p className="w-auto tabular-nums">
                {post.metadata.publishedAt}
              </p>
              <p>|</p>
              <p className="tracking-tight text-blue-700 underline decoration-blue-700 decoration-1">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        )).slice(0, pageSize)}
    </div>
  )
}
