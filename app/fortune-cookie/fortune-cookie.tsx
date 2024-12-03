'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface FortuneCookieProps {
  fortune: string
}

export default function FortuneCookie({ fortune }: FortuneCookieProps) {
  const [isOpen, setIsOpen] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/assets/fortune-cookie/crunch.mp3" />
      <div className="flex flex-row items-center justify-center gap-0" 
        onClick={() => {
          setIsOpen(!isOpen)
          playSound()
        }}>
        <div id="leftCookie" className={`w-20 h-40 transition-transform duration-500 ${
          isOpen ? '-translate-x-16 -rotate-45' : 'translate-x-0 rotate-0'
        }`}>
          <Image quality={100} width={100} height={100} src="/assets/fortune-cookie/left-min.png" alt="left half of chocolate cookie" />
        </div>
        <div id="fortune" className={`max-w-64 text-center bg-white mx-4 mb-4 shadow-md rounded-md max-h-content p-4 transition-all duration-500 ${
          isOpen ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-0 hidden'
        }`}>
          <p className='font-serif text-zinc-700 text-pretty text-sm'>{fortune}</p>
        </div>
        <div id='rightCookie' className={`w-20 h-40 transition-transform duration-500 ${
          isOpen ? 'translate-x-16 rotate-45' : 'translate-x-0 rotate-0'
        }`}>
          <Image quality={100} width={100} height={100} src="/assets/fortune-cookie/right-min.png" alt="right half of chocolate cookie" />
        </div>
      </div>
    </>
  )
}

