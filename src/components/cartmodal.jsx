"use client"

import React, { useMemo } from 'react';
import { oswald, montserrat } from '@/app/layout';
import { LiaTimesSolid } from 'react-icons/lia';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '@/store/modalSlice';
import SideCart from './sidecart';
import { CgArrowTopRightR } from 'react-icons/cg';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

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
    <AnimatePresence>
      {
        cartModal && (
          <motion.div
          key={"modal"}
          initial={{
            opacity: 0
          }} 
          animate={{
            opacity: 1
          }}
          exit={{
            opacity : 0
          }} 
          onClick={()=>dispatch(modalActions.toggleCart())}
          className='fixed top-0 w-full h-screen bg-black bg-opacity-40' />
        )
      }
      {
        cartModal &&
        (
        <motion.div 
        initial={{
          x : 400
        }}
        animate={{
          x : -1
        }}
        exit={{
          x : 500
        }}
        transition={{
          type : "spring",
          ease : "easeOut",
          stiffness : "200"
        }}
        className={`top-0 right-0 h-screen w-[33rem] max-w-full bg-white fixed z-[100000] transition-transform duration-200 ease-out`}>
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
                <div className='w-full overflow-y-auto h-[32rem] relative'>
                  { 
                    isLoading && (
                      <div className='fixed flex items-center justify-center w-full h-full bg-opacity-25 bg-textGray'>
                        <div className=''>
                          <img src="/spinner.svg" className="!-mt-56"/>
                        </div>
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
          <div className={`absolute w-full px-4 bottom-1 ${montserrat.className} bg-white`}>
            {
              carts.length === 0 ? (
                <div className="flex justify-center">
                  <Link href="/products" className='text-center btn'>Continue Shopping</Link>
                </div>
              ) : (
                <div className='flex flex-col space-y-3 text-textGray '>
                  <div className='flex items-center justify-between py-3 border-t border-b'>
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
        </motion.div>
        )
      }
    </AnimatePresence>
  )
}
