import Link from 'next/link';
import React from 'react';
import { oswald } from '@/app/layout';

export default function Icons({ name, icon }) {
  return (
    <div className={`flex flex-col space-y-6 items-center ${oswald.className} justify-center p-5`}>
      <Link href="" className='transition-transform duration-500 hover:translate-y-4 ease-out'>
        <span className='text-4xl md:text-6xl lg:text-8xl text-darkOrange'>{icon}</span>
      </Link>
      <Link href="">
        <p className='text-3xl font-medium custom-black text-center'>{name}</p>
      </Link>
    </div>
  )
}
