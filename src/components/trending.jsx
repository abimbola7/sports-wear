import React from 'react'
import { oswald } from '@/app/layout'
import Image from 'next/image'
import Link from 'next/link'


export default function Trending() {
  return (
    <section className={`mt-12 px-8 md:px-4 bg-customBlack ${oswald.className} text-white`}>
      <div className="grid max-w-xl grid-cols-1 mx-auto md:max-w-7xl md:grid-cols-3 gap-x-10">
        <div className="py-5 md:pl-6">
          <h1 className={`text-5xl font-semibold leading-relaxed`}>Trending Sports Wear for</h1>
        </div>
        <Link
        href={`/products/men`}
         className="">
          <Image
            quality={100}
            src={"https://firebasestorage.googleapis.com/v0/b/sport-wear-store.appspot.com/o/sports-wear-store-more-category-img-1.jpg?alt=media&token=3d0192d3-e663-443b-9db6-352ea7e37a5a"}
            alt={"alt"}
            className="object-cover object-center w-full "
            width={300}
            height={200}
          />
          <p className='my-6 text-xl font-semibold md:text-3xl'>MEN</p>
        </Link>
        <Link
        href={`/products/women`}
         className="">
          <p className='my-6 text-xl font-semibold md:text-3xl'>WOMEN</p>
          <Image
            quality={100}
              src={"https://firebasestorage.googleapis.com/v0/b/sport-wear-store.appspot.com/o/sports-wear-store-more-category-img-2.jpg?alt=media&token=3d0192d3-e663-443b-9db6-352ea7e37a5a"}
              alt={"alt"}
              className="object-cover object-center w-full "
              width={300}
              height={200}
            />
        </Link>
      </div>
    </section>
  )
}
