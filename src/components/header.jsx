
"use client"
import React from 'react'
import { Montserrat } from "next/font/google"
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai"
import { PiShoppingCartFill } from "react-icons/pi" 
import { CgProfile } from "react-icons/cg" 
const montserrat = Montserrat({
  subsets : ['latin-ext'],
  weights : [100]
})


export default function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  React.useEffect(() => {
  const scrollHandler = (event) =>{
    if (window.scrollY > 100) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  window.addEventListener('scroll', scrollHandler)
  },[])
  return (
    <header 
    className={`${montserrat.className} font-extrabold fixed top-0 w-full text-white z-[100000] ${ isScrolled && 'bg-white' } transition-colors duration-500 `}>
      <div
      className='flex items-center justify-between mx-auto max-w-7xl py-4 px-4 md:px-2'
      >
      {/* left */}
       <div className="flex items-center space-x-10">
        <h2 className='text-2xl font-bold'>
          SPARTA
          <span className='text-darkOrange'>X</span>
        </h2>

        <ul className='space-x-6 hidden md:inline-flex'>
          {
            ['SHOP ALL', 'MEN', 'WOMEN', 'TOP DEALS'].map((item, index) => (
              <li key={index} className='text-xs font-medium cursor-pointer hover:text-darkOrange'>{item}</li>
            ))
          }
        </ul>
       </div> 

       {/* right */}
       <div className='font-medium text-darkOrange space-x-4 hidden md:inline-flex'>
          <AiOutlineSearch className="icon"/>
          <p>$48.50</p>
          <PiShoppingCartFill className='icon'/>
          <CgProfile className='icon'/>
       </div> 

       <div className="p-2 bg-darkOrange rounded-sm md:hidden">
          <AiOutlineMenu className='cursor-pointer text-xl'/>
       </div>
      </div>
    </header>
  )
}
