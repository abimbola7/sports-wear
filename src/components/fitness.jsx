import Image from 'next/image'
import React from 'react'
import "./fitness.css"
import { oswald, montserrat } from '@/app/layout'
import Link from 'next/link'

export default function Fitness() {
  return (
    <section className="my-16">
      <div
      className="w-[90%] grid grid-cols-2 md:grid-cols-10 mx-auto fitness"
      >
      <div className='md:col-span-3'>
      <Image
        src={"https://firebasestorage.googleapis.com/v0/b/sport-wear-store.appspot.com/o/sports-wear-store-banner-img-1.jpg?alt=media&token=78f02b85-05e2-464f-9b0c-24caca7a626a"}
        alt={"alt"}
        className="object-cover object-center w-full "
        width={300}
        height={200}
      />
      </div>
      <div className='md:col-span-3'>
        <Image
          src={"https://firebasestorage.googleapis.com/v0/b/sport-wear-store.appspot.com/o/sports-wear-store-banner-img-2.jpg?alt=media&token=78f02b85-05e2-464f-9b0c-24caca7a626a"}
          alt={"alt"}
          className="object-cover object-center w-full "
          width={300}
          height={200}
        /> 
      </div>
      <div className='w-full col-span-4 flex md:items-end text-white md:justify-end justify-center items-center'>
        <div className="w-full md:max-w-md flex flex-col space-y-6 text-center md:text-right items-center md:items-end md:pr-12 mb-14 mt-10 md:mt-0">
          <h1 className={`${oswald.className} text-5xl`}>Fitness Ready</h1>
          <p className={`${montserrat.className}`}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat, beatae iusto autem.</p>
          <Link 
          href={`/products/gears`}
          className={`px-8 py-4 rounded-3xl text-sm bg-white text-black w-fit font-semibold ${montserrat.className} text-center`}>
            SHOP NOW
          </Link>
        </div>
      </div>
      </div>
    </section>
  )
}
