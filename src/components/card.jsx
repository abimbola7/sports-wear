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

export default function Card({ imageUrl, name, price, id }) {
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
        <div>
          <div className='relative group overflow-hidden'>
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
              className='hover:scale-110 duration-500 transition-transform ease-out'
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

          <div className='p-3'>
            <Link className={`${oswald.className} font-medium`} href={`products/${id}`}> <h1>{name}</h1></Link>
            <p className={`${montserrat.className} font-bold text-sm text-textGray`}>${price.toFixed(2)}</p>
          </div>
        </div>
      </>
  )
}
