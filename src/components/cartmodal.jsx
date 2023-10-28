"use client"

import React from 'react'
import { oswald, montserrat } from '@/app/layout'
import { LiaTimesSolid } from 'react-icons/lia'
import { useDispatch, useSelector } from 'react-redux'
import { modalActions } from '@/store/modalSlice'
import SideCart from './sidecart'
import { CgArrowTopRightR } from 'react-icons/cg'

export default function CartModal() {
  const dispatch = useDispatch();
  const carts = useSelector(state=>state.cart.cart);
  const cartModal = useSelector(state=>state.modal.cartIsToggled);
  console.log(cartModal);
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
            !carts && carts.length === 0 &&
            <div className="justify-center flex items-center h-[40rem]">
            <p className={`${montserrat.className} text-textGray text-sm tracking-wide`}>No products in cart</p>
          </div>
          }

          {
            carts && carts.length > 0 && (
              <>
                <div className='w-full overflow-auto h-96'>
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
          <div className='absolute w-full px-4 bottom-4'>
            <button className='w-full px-4 py-3 font-semibold text-white uppercase bg-darkOrange rounded-3xl'>Continue Shopping</button>
          </div>
        </div>
        )
      }
    </>
  )
}
