import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Blog',
  description: 'Nurbek Fayziev\'s blog',
}

export default function Page({ searchParams }: { searchParams: { tag?: string } }) {
  const tag = searchParams.tag ?? null

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Blog</h1>
      <BlogPosts searchParams={{ tag }} />
    </section>
  )
}
