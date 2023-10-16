import Image from 'next/image'
import React from 'react'

export default function CategoryItems({ src, title, link }) {
  return (
    <div
    className='h-[520px] relative'
    >
      <Image
      src={src}
      alt={"alt"}
      className="object-cover object-center w-full "
      fill
      />
    </div>
  )
}
