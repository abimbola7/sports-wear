import React from 'react'
import Banner from '@/components/banner'
import Category from '@/components/category'
import Collection from '@/components/collection'
import Fitness from '@/components/fitness'
import Hero from '@/components/hero'
import LatestDrop from '@/components/latest-drop'
import Trending from '@/components/trending'
import Explore from '@/components/explore'

export default function Home() {
    return (
    <>
      <Hero />
      <Category/>
      <Trending />
      <LatestDrop />
      <Fitness />
      <Banner />
      <Collection />
      <Explore />
    </>
  )
}
