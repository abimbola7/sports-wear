import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { oswald, montserrat } from '@/app/layout'
import { FaEye } from "react-icons/fa"
import { IoIosCart } from "react-icons/io"

export default function Card({ imageUrl, name, price, id }) {
  return (
    <div>
      <div className='relative group overflow-hidden'>
        <Link 
        href={`products/${id}`}
        >
          <Image 
          src={imageUrl}
          alt="products"
          width={300}
          height={200}
          placeholder='blur'
          blurDataURL='/spinner.svg'
          className='hover:scale-110 duration-200 transition-transform ease-out'
          />
        </Link>
        <span className="top-4 icons"><IoIosCart/></span>
        <span className="top-16 icons"><FaEye /></span>
      </div>

      <div className='p-3'>
        <Link className={`${oswald.className} font-medium`} href={`products/${id}`}> <h1>{name}</h1></Link>
        <p className={`${montserrat.className} font-bold text-sm text-textGray`}>${price.toFixed(2)}</p>
      </div>
    </div>
  )
}
