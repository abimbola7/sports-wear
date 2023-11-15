import Image from 'next/image'
import React from 'react'
import { montserrat, oswald } from '@/app/layout'
import CartBtn from './cart-btn'
import CartButton from './cartBtn1';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';
import { clearedCart, fetchCart } from '@/store/cartSlice';
import { LiaTimesCircle } from 'react-icons/lia';
import Link from 'next/link';
import { hamburgerToggler } from '@/store/uiSlice';
import { modalActions } from '@/store/modalSlice';


export default function SideCart({ id, name, imageUrl, price, amount }) {
  const { data } =  useSession();
  const dispatch = useDispatch();
  const amountRef = React.useRef();
  const addToCart = () => {
    dispatch(fetchCart({
      uid:data?.user?.uid, 
      item:{
        id : id,
        name : name,
        price : price,
        imageUrl : imageUrl,
        amount : +amountRef.current.value
      },
      type : "PRODUCT"
    }));
  };

  return (
    <div className='grid grid-cols-5 px-3 my-3 gap-x-3'>
      <div className=''>
        <div>
          <Image
          src={imageUrl}
          alt='carts'
          width={60}
          height={60}
          />
        </div>
      </div>
      <div className='col-span-3 space-y-3 '>
        <Link 
        onClick={()=>{
          setTimeout(()=>dispatch(modalActions.toggleCart()), 1000)
        }} 
        href={`/products/${id}`} 
        className={`${montserrat.className} font-medium text-textGray text-md tracking-wide hover:text-darkOrange duration-200 transition-colors`}>{ name }</Link>
        <CartButton 
        ref={amountRef} 
        amount={amount}
        add={addToCart}          
        />
      </div>
      
      <div className={`flex flex-col items-center justify-center space-y-3 font-light text-textGray ${montserrat.className}`}>
        <LiaTimesCircle 
        className='text-2xl cursor-pointer text-textGray'
        onClick={()=>dispatch(clearedCart({ uid : data?.user?.uid, id : id, name : name }))}
        />
        <p className='text-md'>${ (amount * price).toFixed(2) }</p>
      </div>
    </div>
  )
}
