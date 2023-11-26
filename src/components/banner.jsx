"use client"
import React from 'react'
import "./banner.css"
import { montserrat, oswald } from '@/app/layout'
import Link from 'next/link'

const Banner = () => {
  return (
    <section>
      <div
      className='w-[90%] h-fit sm:h-[400px] lg:h-[450px] banner mx-auto p-8 sm:p-16 mb-4'
      >
        <h2 className={`text-3xl font-bold text-white ${montserrat.className} text-center md:text-left`}>
          SPARTA
          <span className='text-darkOrange'>X</span>
        </h2>
        <div
        className="flex flex-col mt-10 text-white max-w-full md:max-w-xs lg:max-w-md items-center md:items-start"
        >
          <div className='space-y-9 lg:space-y-14 text-center md:text-left'>
            <h1 className={`font-semibold text-5xl ${oswald.className}`}>Street Ready</h1>
            <p className={`mt-10 ${montserrat.className}`}>lorem ipsum lil uzi vert, pharrel williams, dr dre, tyler, the creator, brent fawaz, shakira, linkin park</p>
          </div>
          <Link 
          href={`/products/shoes`}
          className={`px-8 py-4 rounded-3xl text-xs bg-white text-black w-fit font-semibold ${montserrat.className} mt-12 lg:mt-24`}>
            SHOP NOW
          </Link>
        </div>
      </div>
    </section>
  )
} 

export default Banner;