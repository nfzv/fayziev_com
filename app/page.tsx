import { BlogPosts } from 'app/components/posts'
import { getBlogPosts } from 'app/blog/utils'
import { getAllViewCounts } from 'app/lib/views'
import { featureFlags } from 'app/lib/feature-flags'
import Image from 'next/image'

export default async function Page() {
  const getAge = birthDate => Math.floor((new Date().getTime() - new Date(birthDate).getTime()) / 3.15576e+10)
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
      <Image className='float-left mr-4 mb-4 pr-3' src={`/profile.jpg`} alt={"Nurbek Fayziev in Nice, France (2022)"} width="128" height="128" />
      <p className="mb-6 text-pretty prose">
        {`Nurbek is a ${getAge('1999-11-14')}-year old engineer and product visionary with 5+ years of experience in leading projects and designing/building
software systems from the ground up.`} <span className='underline'>Domains of expertise:</span> <em>cloud, web, iam, k8s. </em>
        <span className='underline'>Domains of interest:</span> <em>semantic analysis, robotics</em>
      </p>
      <div className="my-9">
        <span className='flex justify-between border-b-1 border-gray-500 mb-4 pb-1'>
          <h1 className="text-lg font-semibold">Top posts</h1>
          <a href="/blog" className="text-sm text-gray-600 italic" aria-label="Read more">
            Read more &rarr;
          </a>
        </span>
        <BlogPosts searchParams={{}} includeTags={false} posts={posts} viewCounts={viewCounts} thisYearTop5={true} />
      </div>
      <div className="my-9">
        <span className='flex justify-between border-b-1 border-gray-500 mb-4 pb-1'>
          <h1 className="text-lg font-semibold">Fun things</h1>
        </span>
        <ul className='prose'>
          <li>
            <a href='/time-flies'>Time Flies</a>
          </li>
          <li>
            <a href='/fortune-cookie'>Fortune Cookie</a>
          </li>
        </ul>
      </div>
    </section>
  )
}