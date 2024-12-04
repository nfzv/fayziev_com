import FortuneCookie from './fortune-cookie'
import { generateFortune } from './generateFortune'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Fortune Cookie',
  description: 'A fortune cookie that generates one-line fortunes using Groq API and Llama3 model',
  authors: [{ name: 'Nurbek Fayziev', url: 'https://fayziev.com' }],
  creator: 'Nurbek Fayziev',
}

export default async function Home() {  
  async function getFortune(): Promise<string> {
    "use server"
    return await generateFortune()
  }

  return (
    <main className="flex min-h-fit py-18 md:py-24 flex-col items-center justify-center">
      <FortuneCookie getFortune={getFortune} />
      <h1 className="text-4xl font-bold pb-2">Fortune Cookie</h1>
      <p className="text-center text-gray-600 pb-4">Click the cookie to reveal your fortune!</p>
      <p className="text-center text-xs text-gray-400 pb-4">Powered by Groq API, using model: gemma2-9b-it</p>
    </main>
  )
}

