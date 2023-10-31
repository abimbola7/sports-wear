"use client"
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { montserrat, oswald } from '@/app/layout';
import TableCart from './tablecart';
import CartLoading from './loading';

export default function CardLayout() {
  const cartData = useSelector(state=>state.cart.cart);
  const isLoading = useSelector(state=>state.cart.isLoading);
  const cart = React.useMemo(()=>cartData, [cartData]);
  const [ totalPrice, setTotalPrice ] = React.useState(0)
  const [loading, setLoading] = React.useState(false);
  React.useEffect(()=>{
    setTotalPrice(
      cart?.reduce((total, item)=>total + (item.amount * item.price), 0)
    )
  }, [cart])
  return (
    <div className='pt-16 min-h-screen bg-[#f7f7f7] hidden md:block px-6'>
      <div className="max-w-[87rem] lg:mx-auto bg-white pt-20 px-5 lg:px-24 mx-5 min-h-screen">
        <h1 className={`${oswald.className} text-3xl font-medium`}>Cart</h1>
        {
          cart.length > 0 && (
            <div className='grid grid-cols-3 mt-4 gap-x-4'>
              <div className='col-span-2'>
              {isLoading ? <CartLoading /> : <TableCart cart={cart} />}
              </div>
              <div className={`border ${isLoading && 'p-4'}`}>
                {
                  isLoading ? (
                      <div className='flex flex-col w-full space-y-4 animate-pulse'>
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
                          <div className='flex p-3 space-x-6 text-md'>
                            <p>Subtotal</p>
                            <p>${ totalPrice.toFixed(2) }</p>
                          </div>
                        </div>

                        <div className='border-b'>
                          <div className='flex p-3 space-x-6 text-md'>
                            <p>Total</p>
                            <p>${ totalPrice.toFixed(2) }</p>
                          </div>
                        </div>

                        <div className={`p-3 ${montserrat.className} flex flex-col space-y-3`}>
                          <p>Have a coupon?</p>
                          <button className='flex-1 py-5 text-lg font-semibold text-white bg-darkOrange rounded-3xl'>BUY NOW</button>
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
            </div>   
          )
        }
      </div>
    </div>
  )
}
