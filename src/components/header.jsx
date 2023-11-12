"use client"
import React, { useMemo } from 'react'
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai"
import { PiShoppingCartFill } from "react-icons/pi" 
import { CgProfile } from "react-icons/cg" 
import { montserrat, oswald } from '@/app/layout';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { modalActions } from '@/store/modalSlice'
import { fetchShoeData } from '@/store/cartSlice'
import { hamburgerToggler } from '@/store/uiSlice'
import {signIn, signOut, useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'


export default function Header() {
  const carts = useSelector(state=>state.cart.cart)
  const updatedCarts = useMemo(() => carts, [carts])
  const [ totaAmount, setTotalAmount ] = React.useState(0)
  const [ totalPrice, setTotalPrice ] = React.useState(0)
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { data } = useSession();
  const pathname = usePathname();
  React.useEffect(()=>{
    setTotalAmount(
      updatedCarts?.reduce((total, item)=>total + item.amount, 0)
    )
    setTotalPrice(
      updatedCarts?.reduce((total, item)=>total + (item.amount * item.price), 0)
    )
  }, [updatedCarts])
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
      {/* <SideBar /> */}
      <div
      className='flex items-center justify-between px-4 py-4 mx-auto max-w-7xl md:px-2'
      >
      {/* left */}
       <div className="flex items-center space-x-10">
        <Link 
        href="/" 
        className='text-2xl font-bold'>
          SPARTA
          <span className='text-darkOrange'>X</span>
        </Link>
        <ul className='hidden space-x-6 md:inline-flex'>
          {
            [
              ['SHOP ALL', '/products'], ['MEN', '/products/men'], ['WOMEN', '/products/women'], ['TOP DEALS', 'top-deals']
            ].map(([item, url]) => (
              <Link 
              key={item}
              href={url}>
                <li 
                className='text-xs font-medium cursor-pointer hover:text-darkOrange'>
                  {item}
                </li>
              </Link>
            ))
          }
        </ul>
       </div> 

       {/* right */}
       {
          <div className='items-center hidden space-x-4 font-medium text-darkOrange md:inline-flex'>
              <AiOutlineSearch className="icon"/>
              <p>${totalPrice.toFixed(2)}</p>
              <div className='relative z-1'>
                <div className='absolute px-1 text-xs text-white rounded-full pointer-events-none -top-1 left-4 bg-darkOrange'>{ totaAmount }</div>
                <PiShoppingCartFill 
                onClick={()=>dispatch(modalActions.toggleCart())}
                className='text-2xl cursor-pointer text-darkOrange'/>
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
                  className='flex-shrink-0 h-8 rounded-full cursor-pointer'/>
                )
              }
          </div> 
       }

       <div 
       onClick={()=>dispatch(hamburgerToggler())}
       className="p-2 rounded-sm bg-darkOrange md:hidden cursor-pointer">
          <AiOutlineMenu className='text-xl text-white'/>
       </div>
      </div>
    </header>
  )
}
