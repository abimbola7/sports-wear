import Image from 'next/image'
import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { MdOutlineArrowRightAlt } from "react-icons/md"



export default function CategoryItems({ src, title, link, type }) {
  return (
    <div
    className='h-[200px] md:h-[300px] lg:h-[550px] relative'
    >
      <Image
      src={src}
      alt={"alt"}
      className="object-cover object-center w-full "
      fill
      />
      <div
      className='absolute bottom-6 left-6 w-fit'
      >
        <button
        className='px-8 py-3 rounded-3xl text-sm bg-white text-black w-fit font-semibold group'
        >
        {type}
        <BsArrowRight className='inline-flex ml-1 pb-1 text-2xl'/>
        </button>
      </div>
    </div>
  )
}
