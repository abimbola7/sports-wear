"use client"

import React, { useMemo } from 'react'
import { oswald, montserrat } from '@/app/layout'
import { LiaTimesSolid } from 'react-icons/lia'
import { useDispatch, useSelector } from 'react-redux'
import { modalActions } from '@/store/modalSlice'
import SideCart from './sidecart'
import { CgArrowTopRightR } from 'react-icons/cg'
import Link from 'next/link'

export default function CartModal() {
  const dispatch = useDispatch();
  const cartss = useSelector(state=>state.cart.cart);
  const carts = useMemo(() => cartss, [cartss]);
  const [ totalPrice, setTotalPrice ] = React.useState(0)
  const isLoading = useSelector(state=>state.cart.isLoading);
  const error = useSelector(state=>state.cart.error);
  const cartModal = useSelector(state=>state.modal.cartIsToggled);
  React.useEffect(()=>{
    setTotalPrice(
      carts?.reduce((total, item)=>total + (item.amount * item.price), 0)
    )
  }, [carts])

  return (
    <>
      {
        cartModal && (
          <div 
          onClick={()=>dispatch(modalActions.toggleCart())}
          className='fixed top-0 w-full h-screen bg-black bg-opacity-40' />
        )
      }
      {
        (
        <div className={`top-0 right-0 h-screen w-[33rem] max-w-full bg-white fixed z-[100000] transition-transform duration-200 ease-out ${cartModal ? 'translate-x-0' : 'translate-x-[33rem]'}`}>
          <div className='border-b border-[#DDDDDD] flex items-center justify-between p-4'>
            <h1 className={`${montserrat.className} text-textGray text-light `}>Shopping Cart</h1>
            <LiaTimesSolid 
            onClick={()=>dispatch(modalActions.toggleCart())}
            className="text-xl font-semibold cursor-pointer"/>
          </div>
          {
            carts.length === 0 &&
            <div className="justify-center flex items-center h-[40rem]">
            <p className={`${montserrat.className} text-textGray text-sm tracking-wide`}>No products in cart</p>
          </div>
          }

          {
            carts && carts.length > 0 && (
              <>
                <div className='w-full overflow-auto h-[32rem] relative'>
                { 
                  isLoading && (
                    <div className='fixed bg-textGray h-full w-full flex items-center justify-center bg-opacity-25 '>
                      <img src="/spinner.svg"></img>
                    </div>
                  )
                }
                  {
                    carts.map(cart=>(
                      <SideCart 
                      key={cart.id}
                      id={cart.id}
                      name={cart.name}
                      imageUrl={cart.imageUrl}
                      price={cart.price}
                      amount={cart.amount}
                      />
                    ))
                  }
                </div>
              </>
            )
          }
          <div className={`absolute w-full px-4 bottom-4 ${montserrat.className}`}>
            {
              carts.length === 0 ? (
                <button className='btn'>Continue Shopping</button>
              ) : (
                <div className='flex flex-col space-y-3 text-textGray text-light'>
                  <div className='border-t border-b py-3 flex justify-between items-center'>
                    <p>Subtotal:</p>
                    <p>${ totalPrice?.toFixed(2) }</p>
                  </div>
                  <Link href="/cart" onClick={()=>dispatch(modalActions.toggleCart())}>
                    <button className='btn'>VIEW CART</button>
                  </Link>
                  <Link href="/checkout">
                    <button className='btn'>CHECKOUT</button>
                  </Link>
                </div>
              )
            }
          </div>
        </div>
        )
      }
    </>
  )
}
