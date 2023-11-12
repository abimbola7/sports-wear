"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { oswald, montserrat } from '@/app/layout'
import { FaEye } from "react-icons/fa"
import { IoIosCart } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '@/store/modalSlice'
import { useSession } from 'next-auth/react';
import Modal from './modal'
import { useRouter } from 'next/navigation'
import { fetchCart } from '@/store/cartSlice'

export default function Card({ imageUrl, name, price, id, amount }) {
  const router = useRouter();
  const { data }  = useSession();
  const dispatch = useDispatch();
  const isLoading = useSelector(state=>state.cart.isLoading);
  const [ ids, setIds ] = React.useState(null)
  const modal = useSelector(state=>state.modal.isToggled);
  const openModal = () => {
    dispatch(modalActions.toggleModal());
    setIds(id);
    document.body.style.overflow = 'hidden'
  };

  const addToCart = () => {
    // dispatch(fetchCart(data?.user?.uid));
    dispatch(fetchCart({
      uid:data?.user?.uid, 
      item:{
        id : id,
        name : name,
        price : price,
        imageUrl : imageUrl,
        amount : 1
      },
    }));
  };
  return (
      <>
        { modal &&
          <Modal
          imageUrl={imageUrl}
          amount={amount}
          name={name}
          price={price}
          setIds={setIds}
          id={ids}
          />
        }
        <div>
          <div className='relative overflow-hidden group'>
            <div
            className='cursor-pointer'
            onClick={()=>router.push(`/products/${id}`)}
            >
              <Image 
              src={imageUrl}
              alt="products"
              width={300}
              height={200}
              placeholder='blur'
              blurDataURL='/loading.svg'
              className='transition-transform duration-500 ease-out hover:scale-110'
              />
            </div>
            <span 
            onClick={addToCart}
            className="top-4 icons">
            <IoIosCart className={`${isLoading && "animate-spin pointer-events-none"}`}/>
            </span>
            
            <span 
            className="top-16 icons"
            onClick={openModal}
            ><FaEye /></span>
          </div>

          <div className='p-3'>
            <div 
            className={`${oswald.className} font-medium cursor-pointer`} 
            onClick={()=>router.push(`/products/${id}`)}
            > <h1>{name}</h1></div>
            <p className={`${montserrat.className} font-bold text-sm text-textGray`}>${price.toFixed(2)}</p>
          </div>
        </div>
      </>
  )
}
