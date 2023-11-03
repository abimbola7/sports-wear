"use client"
import Link from 'next/link'
import React from 'react'
import { BsArrowRight } from "react-icons/bs"
import { oswald, montserrat } from '@/app/layout'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLatest } from '@/store/productsSlice'
import Card from './card'
import ErrorComp from './error'

export default function LatestDrop() {
  const latest = useSelector(state=>state.products.latest);
  const isLoading  = useSelector(state=>state.products.isLoading);
  const error  = useSelector(state=>state.products.error);
  console.log(isLoading)
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log("ee")
    dispatch(fetchLatest("dd"));
  }, [dispatch]);
  


  return (
    <section className='px-4'>
      <div className='mx-auto max-w-7xl'>
        <div className={`flex items-center justify-between ${oswald.className} text-xl my-10`}>
          <h2 className='text-2xl font-medium'>The Latest Drop</h2>
          <Link
          href="products"
          className='text-darkOrange hover:text-customBlack'
          >SHOP ALL
          <BsArrowRight className='inline-flex pb-1 ml-1'/>
          </Link>
        </div>
        {
          isLoading ? (
            <div className='flex justify-center'>
              <img 
              src="/spinner.svg" 
              alt="" className='h-20'/>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
              {
                latest.length > 0 && latest.map(latest=>(
                  <Card 
                  key={latest.id}
                  id={latest.id}
                  imageUrl={latest.imageUrl}
                  name={latest.name}
                  price={latest.price}
                  amount={latest.amount}
                  />
                ))
              }
            </div>
          )
        }
        {
        !isLoading && error && (
        <ErrorComp error={error} />
        )
        }
      </div>
    </section>
  )
}
