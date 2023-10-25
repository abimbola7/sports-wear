"use client"

import React from 'react'
import { fetchProduct } from '@/store/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { montserrat, oswald } from '@/app/layout';
import CartBtn from '@/components/cart-btn';

export default function ProductItem({ params }) {
  const dispatch = useDispatch();
  const product = useSelector(state=>state.product.product);
  const loading = useSelector(state=>state.product.isLoading);
  const error = useSelector(state=>state.product.error);

  React.useEffect(()=>{
    dispatch(fetchProduct(params.id))
  }, [dispatch, params.id])

  return (
    <>
      {
        loading && !error && Object.keys(product).length === 0 && (
          <div className='min-h-screen w-full flex items-center justify-center'>
            <img src="/spinner.svg"/>
          </div>
        )
      }
      {
        !loading && !error && Object.keys(product).length !== 0 && (
          <div className="min-h-screen max-w-[87rem] lg:mx-auto mt-14 bg-white px-5 md:px-24 mx-5">
            <div className='py-8 md:py-32 w-full grid grid-cols-1 md:grid-cols-2 md:gap-x-10 gap-y-8 md:gap-y-0'>
                <div className="">
                  <Image
                  src={product.imageUrl}
                  alt="product"
                  width={600}
                  height={400}
                  placeholder='blur'
                  blurDataURL='/spinner.svg'
                  />
                </div>

                <div>
                  <div className={`flex text-textGray ${montserrat.className} text-sm capitalize`}>
                    <Link href={"/"} className="mr-1">Home </Link> &nbsp; {"/"} &nbsp;
                    {
                      product.category?.map(prod=>(
                        <>
                          <Link 
                          key={prod}
                          href={prod.toLowerCase()}>{prod}</Link> &nbsp; {"/"} &nbsp;
                        </>
                      ))
                    }
                    <span>{ product.name }</span>
                  </div>

                  <div className={`flex text-textGray ${montserrat.className} text-md capitalize mt-5`}>
                    {
                      product.category?.map((prod, i)=>(
                        <>
                          <Link 
                          className='hover:text-darkOrange'
                          key={prod}
                          href={prod.toLowerCase()}>
                          {prod}
                          {product.category.length - 1 === i ? 
                          "" : 
                          <span>
                          {","} &nbsp;
                          </span> 
                          }
                          </Link>
                        </>
                      ))
                    }
                  </div>

                  <div className="flex flex-col space-y-2 text-customBlack mt-4">
                    <h1 className={`${ oswald.className } font-medium text-3xl`}>{ product?.name }</h1>
                    <p className="font-bold text-2xl text-textGray">${ product?.price?.toFixed(2) }</p>
                    <p className='text-textGray font-normal'>{ product?.description }</p>
                    <div className="flex flex-col sm:flex-row sm:space-x-3 sm:items-center justify-start sm:!mt-5 max-w-sm pb-2 flex-wrap">
                      <CartBtn />
                      <button className="uppercase font-semibold flex-1 py-2 tracking-wider text-sm bg-darkOrange rounded-3xl text-[#F7F7F7] px-3 mt-3">Add to Cart</button>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:space-x-3 sm:items-center border-t pt-2 text-sm">
                      <div className="">Category: {" "} <span>{ product?.category?.join(', ') }</span></div>
                      <div>
                        Tags: {" "} 
                        <span>{ product?.tags?.join(", ") }</span>
                      </div>
                      {/* {
                        tags.map(tag=>)
                      } */}
                    </div>
                  </div>
                </div>
            </div>
          </div>
        )
      }
    </>
  )
}
