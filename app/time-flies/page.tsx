import TimeFlies from './time-flies'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Time Flies',
  description: 'A visualization of the passage of time using flies. Original creation of Koen van Gilst',
  authors: [{ name: 'Nurbek Fayziev', url: 'https://fayziev.com' }],
  creator: 'Nurbek Fayziev',
}

export default function Home() {
  return <TimeFlies />
}

