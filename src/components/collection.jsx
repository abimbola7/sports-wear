import Image from 'next/image'
import React from 'react'


export default function Collection() {
  return (
    <section>
      <div className="w-[90%] collection mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="py-16"></div>
        <div className="py-10 lg:py-16 lg:col-span-2 lg:pr-14 grid grid-cols-2 lg:gap-x-8">
            <Image
            src={"https://firebasestorage.googleapis.com/v0/b/sport-wear-store.appspot.com/o/sports-wear-store-collection-img-1.jpg?alt=media&token=01d42056-4462-4dd3-b9f9-b21cbe5a1a2b"}
            alt={"alt"}
            className="object-cover object-center w-full "
            width={230}
            height={200}
            />
            <Image
            src={"https://firebasestorage.googleapis.com/v0/b/sport-wear-store.appspot.com/o/sports-wear-store-collection-img-2.jpg?alt=media&token=01d42056-4462-4dd3-b9f9-b21cbe5a1a2b"}
            alt={"alt"}
            className="object-cover object-center w-full "
            width={230}
            height={200}
            />
        </div>
      </div>
    </section>
  )
}
