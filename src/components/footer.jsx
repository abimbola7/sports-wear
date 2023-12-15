import React from 'react'
import { LiaFacebook } from "react-icons/lia"
import { AiOutlineTwitter, AiOutlineYoutube,AiOutlineInstagram } from "react-icons/ai"
import { oswald, montserrat } from '@/app/layout'

export default function Footer() {
  return (
    <footer className="text-white bg-customBlack">
      <div className="flex flex-col-reverse px-4 pt-24 pb-10 space-y-6 text-center sm:flex-row sm:space-x-4 sm:space-y-0 sm:text-left">
        <div className={`flex flex-col justify-between ${montserrat.className} w-full sm:w-1/4 py-1 items-center mt-10 space-y-3 sm:space-y-0`}>
          <h2 className='text-2xl font-bold'>
            SPARTA
            <span className='text-darkOrange'>X</span>
          </h2>
          <ul className="flex items-center pt-5 space-x-3 text-2xl">
            {
             [<LiaFacebook key={1} />,<AiOutlineTwitter key={2} />,<AiOutlineYoutube key={3} />,<AiOutlineInstagram key={4} />].map((icons, index)=>(
              <li key={index}>{icons}</li>
             ))
            }
          </ul>
        </div>
        <div
        className={`${oswald.className} max-w-3xl space-y-4 sm:text-left`}
        >
          <h2 className="text-sm font-semibold">ABOUT US</h2>
          <p className={`${montserrat.className} text-sm`}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam totam deleniti est eum! Quia ex magni sed vitae officia nam? Nisi ut odit asperiores id laudantium, non dolorem deserunt quia.
          Voluptatem soluta qui recusandae quam doloremque excepturi, dicta explicabo veniam? Corrupti beatae amet. 
          Quibusdam totam deleniti est eum! Quia ex magni sed vitae officia nam? Nisi ut odit asperiores.
          </p>
        </div>
      </div>
      <div
      className="grid grid-cols-1 gap-4 pb-16 text-center sm:grid-cols-2 md:grid-cols-4 sm:text-left"
      >
        <div className=""></div>
        <div className="">
          <h1 className="text-lg font-bold">Shop at SpartaX</h1>
          <ul className='mt-5 space-y-2 text-sm'>
            <li>Shop</li>
            <li>Top Deals</li>
            <li>My Account</li>
            <li>Return Policy</li>  
          </ul>
        </div>
        <div className="">
          <h1 className="text-lg font-bold">About SpartaX</h1>
          <ul className='mt-5 space-y-2 text-sm'>
            <li>About</li>
            <li>SpartaX Tax</li>
            <li>Press Rooms</li>
            <li>Careers</li>
          </ul>
        </div>
        <div className="">
          <h1 className="text-lg font-bold">Get in Touch</h1>
          <ul className='mt-5 space-y-2 text-sm'>
            <li>OAU, Ile-ife</li>
            <li>Nigeria</li>
            <li>Call : +2349137823069</li>
            <li className="truncate">abimbolababajide6@gmail.com</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
