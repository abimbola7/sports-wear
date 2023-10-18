import Banner from '@/components/banner'
import Category from '@/components/category'
import Collection from '@/components/collection'
import Fitness from '@/components/fitness'
import Hero from '@/components/hero'
import Trending from '@/components/trending'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Hero />
      <Category/>
      <Trending />
      <Fitness />
      <Banner />
      <Collection />
    </>
  )
}
