import React from 'react'
import { LiaFacebook } from "react-icons/lia"
import { AiOutlineTwitter, AiOutlineYoutube,AiOutlineInstagram } from "react-icons/ai"
import { Montserrat, Oswald } from 'next/font/google'


const oswald = Oswald({
  subsets: ['latin'],
  weights: [400, 700],
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weights: [400, 700],
})

export default function Footer() {
  return (
    <footer className="bg-customBlack text-white">
      <div className="flex pt-24 pb-10 px-4 flex-col-reverse sm:flex-row sm:space-x-4 space-y-6 sm:space-y-0  text-center sm:text-left">
        <div className={`flex flex-col justify-between ${montserrat.className} w-full sm:w-1/4 py-1 items-center mt-10 space-y-3 sm:space-y-0`}>
          <h2 className='text-2xl font-bold'>
            SPARTA
            <span className='text-darkOrange'>X</span>
          </h2>
          <ul className="flex space-x-3 items-center text-2xl pt-5">
            {
             [<LiaFacebook />,<AiOutlineTwitter />,<AiOutlineYoutube />,<AiOutlineInstagram />].map((icons, index)=>(
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
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-left"
      >
        <div className=""></div>
        <div className="">
          <h1 className="font-bold text-lg">Shop at SpartaX</h1>
          <ul className='text-sm mt-5 space-y-2'>
            <li>Shop</li>
            <li>Top Deals</li>
            <li>My Account</li>
            <li>Return Policy</li>  
          </ul>
        </div>
        <div className="">
          <h1 className="font-bold text-lg">About SpartaX</h1>
          <ul className='text-sm mt-5 space-y-2'>
            <li>About</li>
            <li>SpartaX Tax</li>
            <li>Press Rooms</li>
            <li>Careers</li>
          </ul>
        </div>
        <div className="">
          <h1 className="font-bold text-lg">Get in Touch</h1>
          <ul className='text-sm mt-5 space-y-2'>
            <li>BundesstraBe 123, 456 Hamburg</li>
            <li>Germany</li>
            <li>Call : +2349137823069</li>
            <li>abimbolababajide6@gmail.com</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
