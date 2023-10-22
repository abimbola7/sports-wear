"use client"
import React from 'react'
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai"
import { PiShoppingCartFill } from "react-icons/pi" 
import { CgProfile } from "react-icons/cg" 
import { montserrat, oswald } from '@/app/layout';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { fetchShoeData } from '@/store/cartSlice'
import {signIn, signOut, useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'


export default function Header() {
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { data } = useSession();
  const pathname = usePathname();
  // React.useEffect(() => {
  // const scrollHandler = () =>{
  //   if (window.scrollY > 100) {
  //     setIsScrolled(true)
  //   } else {
  //     setIsScrolled(false)
  //   }
  // }

  // window.addEventListener('scroll', scrollHandler);

  // return ()=>{
  //   window.removeEventListener('scroll', scrollHandler);
  // }
  // })

  React.useEffect(()=>{
    dispatch(fetchShoeData(data))
  }, [dispatch, data?.user?.uid])

  console.log(data)
  return (
    <header 
    className={`${montserrat.className} font-extrabold z-[100000] transition-colors duration-500 !bg-transparent`}>
      <div
      className='flex items-center justify-between mx-auto max-w-7xl py-4 px-4 md:px-2'
      >
      {/* left */}
       <div className="flex items-center space-x-10">
        <Link 
        href="/" 
        className='text-2xl font-bold'>
          SPARTA
          <span className='text-darkOrange'>X</span>
        </Link>
        <ul className='space-x-6 hidden md:inline-flex'>
          {
            ['SHOP ALL', 'MEN', 'WOMEN', 'TOP DEALS'].map((item, index) => (
              <li key={index} className='text-xs font-medium cursor-pointer hover:text-darkOrange'>{item}</li>
            ))
          }
        </ul>
       </div> 

       {/* right */}
       {
          <div className='font-medium text-darkOrange space-x-4 hidden md:inline-flex items-center'>
              <AiOutlineSearch className="icon"/>
              <p>$0.00</p>
              <div className='relative'>
                <div className='absolute -top-1 left-4 rounded-full bg-darkOrange text-white px-1 text-xs'>0</div>
                <PiShoppingCartFill className='text-2xl text-darkOrange cursor-pointer'/>
              </div>
              {
                !data ? (
                  <CgProfile 
                  onClick={signIn}
                  className='icon'/>
                ) : (
                  <img 
                  onClick={signOut}
                  src={data?.user?.image} 
                  alt='' 
                  className='rounded-full h-10 cursor-pointer flex-shrink-0'/>
                )
              }
          </div> 
       }

       <div className="p-2 bg-darkOrange rounded-sm md:hidden">
          <AiOutlineMenu className='cursor-pointer text-xl'/>
       </div>
      </div>
    </header>
  )
}
