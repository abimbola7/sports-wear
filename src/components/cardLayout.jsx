"use client"
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { montserrat, oswald } from '@/app/layout';
import TableCart from './tablecart';
import CartLoading from './loading';
import ColCart from './colcart';
import Notify from './notification';
import Link from 'next/link';

export default function CardLayout() {
  const cartData = useSelector(state=>state.cart.cart);
  const isLoading = useSelector(state=>state.cart.isLoading);
  const notification = useSelector(state=>state.ui.notification);
  const cart = React.useMemo(()=>cartData, [cartData]);
  const [ totalPrice, setTotalPrice ] = React.useState(0)
  const [loading, setLoading] = React.useState(false);
  React.useEffect(()=>{
    setTotalPrice(
      cart?.reduce((total, item)=>total + (item.amount * item.price), 0)
    )
  }, [cart])
  return (
    <div className='pt-16 min-h-screen bg-[#f7f7f7]'>
      <div className="max-w-[87rem] lg:mx-auto bg-white pt-20 px-5 lg:px-24 mx-5 min-h-screen">
        <h1 className={`${oswald.className} text-3xl font-medium`}>Cart</h1>
        { notification && <Notify status={notification.status} message={notification.message}/>} 
        {
          cart.length > 0 && (
            <div className='grid grid-cols-1 mt-4 md:grid-cols-3 gap-x-4'>
              <div className='md:col-span-2'>
                {isLoading ? <CartLoading /> : <><TableCart cart={cart} /> <ColCart cart={cart} /></>}
              </div>
              <div className={`border ${isLoading && 'p-4'} mt-14 md:mt-0`}>
                {
                  isLoading ? (
                      <div className='flex flex-col w-full space-y-4 cursor-wait animate-pulse'>
                        <div className='w-full h-10 bg-gray-500 rounded-sm'></div>
                        <div className='w-full h-4 bg-gray-500 rounded-sm'></div>
                        <div className='w-full h-4 bg-gray-500 rounded-sm'></div>
                        <div className='w-full h-4 bg-gray-500 rounded-sm'></div>
                        <div className='w-full h-4 bg-gray-500 rounded-sm'></div>
                        <div className='w-1/2 h-4 bg-gray-500 rounded-sm'></div>
                        <div className='w-full h-20 bg-gray-500 rounded-sm'></div>
                      </div>
                  ) : (
                    <div>
                      <div className='bg-[#f7f7f7] p-3'>
                        <h2 className={`${oswald.className} text-xl font-semibold backdrop-blur-2xl`}>Cart Totals</h2>
                      </div>
                      <div className={`p-4 ${montserrat.className}`}>
                        <div className='border-b'>
                          <div className='flex items-center justify-between p-3 text-md'>
                            <p>Subtotal</p>
                            <p>${ totalPrice?.toFixed(2) }</p>
                          </div>
                        </div>

                        <div className='border-b'>
                          <div className='flex items-center justify-between p-3 text-md'>
                            <p>Total</p>
                            <p>${ totalPrice?.toFixed(2) }</p>
                          </div>
                        </div>

                        <div className={`p-3 ${montserrat.className} flex flex-col space-y-3`}>
                          <p>Have a coupon?</p>
                          <Link href="/checkout"  className='flex-1 py-3 text-lg font-semibold text-white sm:py-5 bg-darkOrange rounded-3xl'>BUY NOW</Link>
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
            </div> 
          ) 
        }
        {
          cart.length === 0 && <Notify status="error" message="Your cart is currently empty" cart={cart}/>
        }
      </div>
    </div>
  )
}
