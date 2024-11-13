import { BlogPosts } from 'app/components/posts'
import Image from 'next/image'

export default function Page() {
  const getAge = birthDate => Math.floor((new Date().getTime() - new Date(birthDate).getTime()) / 3.15576e+10)
  return (
    <section>
      <Image className='float-left mr-4 mb-4 pr-3' src={`/profile.webp`} alt={"Nurbek Fayziev in Nice, France (2022)"} width="128" height="128" />
      <p className="mb-6 text-pretty prose">
        {`Nurbek is a ${getAge('1999-11-14')}-year old engineer and product visionary with more than 5 years of experience in leading projects and designing/building
software systems from the ground up.`} <span className='underline'>Domains of expertise:</span> <em>cloud, microservices, web, k8s. </em>
        <span className='underline'>Domains of interest:</span> <em>Semantic Analysis, Robotics</em>
      </p>
      <div className="my-8">
        <h1 className="text-xl font-semibold pb-4">Recent posts</h1>
        <BlogPosts pageSize={5} />
      </div>
    </section>
  )
}