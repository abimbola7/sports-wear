import Category from '@/components/category'
import Hero from '@/components/hero'
import Trending from '@/components/trending'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Hero />
      <Category/>
      <Trending />
    </>
  )
}
