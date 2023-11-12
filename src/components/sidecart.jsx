import Image from 'next/image'
import React from 'react'
import { montserrat, oswald } from '@/app/layout'
import CartBtn from './cart-btn'
import { MdOutlineCancel } from 'react-icons/md';
import CartButton from './cartBtn1';
import { useSelector, useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';
import { cartAction, clearedCart, fetchCart } from '@/store/cartSlice';
import { LiaTimesCircle } from 'react-icons/lia';


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
        <p className={`${montserrat.className} font-medium text-textGray text-md tracking-wide`}>{ name }</p>
        <CartButton 
        ref={amountRef} 
        amount={amount}
        add={addToCart}          
        />
      </div>
      
      <div className='flex flex-col items-center justify-center space-y-3'>
        <LiaTimesCircle 
        className='text-3xl cursor-pointer text-textGray'
        onClick={()=>dispatch(clearedCart({ uid : data?.user?.uid, id : id, name : name }))}
        />
        <p>${ (amount * price).toFixed(2) }</p>
      </div>
    </div>
  )
}
