import FortuneCookie from './fortune-cookie'
import { generateFortune } from './generateFortune'

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
      <p className="text-center text-xs text-gray-400 pb-4">Powered by Groq API, using model: llama3-groq-70b-8192-tool-use-preview</p>
    </main>
  )
}

