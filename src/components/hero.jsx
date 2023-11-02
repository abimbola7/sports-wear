import React from 'react';
import "./hero.css";
import { oswald, montserrat } from '@/app/layout';
import Link from 'next/link';

export default function Hero() {
  return (
    <section
    className={`min-h-screen w-full bg-cover bg-center bg-no-repeat flex justify-center items-center hero`}
    >
      <div className='w-11/12'>
        <div className="flex flex-col space-y-6 text-white max-w-full md:max-w-xl">
          <h1 className={`text-[5rem] leading-normal font-medium ${oswald.className}`}>Let&apos;s Level Up Your Game</h1>
          <p className={`${montserrat.className} font-semibold text-md`}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas veniam quam dolor voluptates consequatur .</p>
          <Link
          href={`/products`}
          className={`px-8 py-4 rounded-3xl text-xs bg-white text-black w-fit font-semibold ${montserrat.className}`}
          >
            SHOP NOW
          </Link>
        </div>
      </div>
    </section>
  )
}
