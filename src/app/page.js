import React from 'react'
import Banner from '@/components/banner'
import Category from '@/components/category'
import Collection from '@/components/collection'
import Fitness from '@/components/fitness'
import Hero from '@/components/hero'
import LatestDrop from '@/components/latest-drop'
import Trending from '@/components/trending'
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux'
import { cartAction } from '@/store/cartSlice'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import Explore from '@/components/explore'
import CartModal from '@/components/cartmodal'

export default function Home() {
  // React.useEffect(()=>{
    // const getCart = async () => {
    //   if (data) {
    //   console.log(data, "dataaaaa")
    //   const q = collection(db, "carts", data?.user?.uid, "cartsData");
    //   await getDocs(q)
    //   .then(querySnapShot=>{
    //     console.log(querySnapShot.empty, "is it empty?????")
    //   })
    // }
    // }
    // getCart();
  // }, [])

  return (
    <>
      <CartModal />
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
