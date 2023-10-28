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
import { fetchCart } from '@/store/cartSlice'


export default function RowCard( { imageUrl, name, price, id, desc, amount } ) {
  const { data }  = useSession();
  const dispatch = useDispatch();
  const [ ids, setIds ] = React.useState(null)
  const modal = useSelector(state=>state.modal.isToggled);
  let content;
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
      }
    }));
  };
  return (
    <>
        { modal &&
          <Modal
          name={name}
          price={price}
          setIds={setIds}
          id={ids}
          />
        }
        <div className='grid w-full grid-cols-3 group'>
          <div className='relative overflow-hidden'>
            <Link 
              href={`products/${id}`}
              >
                <Image 
                src={imageUrl}
                alt="products"
                width={300}
                height={200}
                placeholder='blur'
                blurDataURL='/loading.svg'
                className='transition-transform duration-500 ease-out group-hover:scale-110'
                />
            </Link>
            <span 
            onClick={addToCart}
            className="top-4 icons"><IoIosCart/></span>
            <span 
            className="top-16 icons"
            onClick={openModal}
            ><FaEye /></span>
          </div>

          <div className='flex flex-col justify-center col-span-2 p-3'>
            <Link className={`${oswald.className} font-medium`} href={`products/${id}`}> <h1>{name}</h1></Link>
            <p className={`${montserrat.className} font-bold text-sm text-textGray`}>${price.toFixed(2)}</p>
            <p className={ `${montserrat.className} text-sm mt-2 line-clamp-2 sm:line-clamp-none` }>{desc}</p>
          </div>
        </div>
    </>
  )
}
