"use client"
import { useSession } from 'next-auth/react';
import { useRef } from 'react';
import React from 'react'
import { fetchProduct } from '@/store/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { montserrat, oswald } from '@/app/layout';
import CartBtn from '@/components/cart-btn';
import { fetchCart } from '@/store/cartSlice';
import CartModal from '@/components/cartmodal';
import ErrorComp from '@/components/error';
import AddCart from '@/components/addCart';

export default function ProductItem({ params }) {
  const { data } = useSession();
  const dispatch = useDispatch();
  const isLoading = useSelector(state=>state.cart.isLoading);
  const product = useSelector(state=>state.product.product);
  const loading = useSelector(state=>state.product.isLoading);
  const error = useSelector(state=>state.product.error);
  const amountRef = useRef();

  React.useEffect(()=>{
    dispatch(fetchProduct(params.id))
  }, [dispatch, params.id])
  
  const addToCart = () => {
    dispatch(fetchCart({
      uid:data?.user?.uid, 
      item:{
        id : product.id,
        name : product.name,
        price : product.price,
        imageUrl : product.imageUrl,
        amount : +amountRef.current.value
      }, 
      type : "PRODUCT"
    }));
  };

  return (
    <>
      <div className='min-h-screen bg-[#F7F7F7] pt-16'>
        {
          !loading && error && (
            <div className={`${montserrat.className} text-center w-full`}>
              {error === "Rejected" && "Something went wrong"} 
              <button 
                onClick={()=>dispatch(fetchProduct(params.id))}
                className={`bg-darkOrange px-4 py-2 rounded-3xl text-white ml-3 ${montserrat.className}`}>
                  Try again
              </button>
            </div>
          ) 
        }
        {
          loading && !error && !product && (
            <div className='flex items-center justify-center w-full min-h-screen'>
              <img src="/spinner.svg"/>
            </div>
          )
        }
        {
          !loading && !error && product && (
            <div className="max-w-[87rem] lg:mx-auto bg-white px-5 md:px-24 mx-5">
              <div className='grid w-full grid-cols-1 py-8 md:py-32 md:grid-cols-2 md:gap-x-10 gap-y-8 md:gap-y-0'>
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
                    <div className={`flex text-textGray ${montserrat.className} text-sm capitalize truncate`}>
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
                      <span className='l line-clamp-1 truncate'>{ product.name }</span>
                    </div>

                    <div className={`flex text-textGray ${montserrat.className} text-md capitalize mt-5`}>
                      {
                        product.category?.map((prod, i)=>(
                          <>
                            <Link 
                            className='hover:text-darkOrange'
                            key={prod}
                            href={`/products/${prod.toLowerCase()}`}>
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

                    <div className="flex flex-col mt-4 space-y-2 text-customBlack">
                      <h1 className={`${ oswald.className } font-medium text-3xl`}>{ product?.name }</h1>
                      <p className="text-2xl font-bold text-textGray">${ product?.price?.toFixed(2) }</p>
                      <p className='font-normal text-textGray'>{ product?.description }</p>
                      <div className="flex flex-col sm:flex-row sm:space-x-3 sm:items-center justify-start sm:!mt-5 max-w-sm pb-2 flex-wrap">
                        <CartBtn
                        amount={product?.amount}
                        ref={amountRef}
                        />
                        <AddCart onAdd={addToCart}/>
                      </div>
                      <div className="flex flex-col pt-2 text-sm border-t sm:flex-row sm:space-x-3 sm:items-center">
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
      </div>
    </>
  )
}
