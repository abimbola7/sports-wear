import Image from 'next/image'
import React from 'react'
import { montserrat, oswald } from '@/app/layout'


export default function SideCart({ name, imageUrl, price, amount }) {
  return (
    <div className='grid grid-cols-5 px-3 my-3 gap-x-3'>
      <div className=''>
        <div>
          <Image
          src={imageUrl}
          alt='carts'
          width={60}
          height={60}
          />
        </div>
      </div>
      <div className='col-span-3'>
        <p className={`${montserrat.className} font-extralight text-textGray text-sm tracking-wide`}>{ name }</p>
      </div>
    </div>
  )
}
