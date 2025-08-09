import { BlogPosts } from 'app/components/posts'
import { getBlogPosts } from 'app/blog/utils'
import { getAllViewCounts } from 'app/lib/views'
import { featureFlags } from 'app/lib/feature-flags'

export const metadata = {
  title: 'Blog',
  description: 'Nurbek Fayziev\'s blog',
}

export default async function Page({ searchParams }: { searchParams: { tag?: string } }) {
  const tag = searchParams.tag ?? null
  const posts = getBlogPosts()
  
  // Fetch view counts on the server
  let viewCounts = {}
  if (featureFlags.viewCounter) {
    try {
      const slugs = posts.map(post => post.slug)
      viewCounts = await getAllViewCounts(slugs)
    } catch (error) {
      console.error('Error fetching view counts:', error)
    }
  }

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Blog</h1>
      <BlogPosts searchParams={{ tag }} posts={posts} viewCounts={viewCounts} />
    </section>
  )
}
