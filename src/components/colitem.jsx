import React from 'react'
import { useDispatch } from 'react-redux'
import { useSession } from 'next-auth/react'
import { LiaTimesCircle } from 'react-icons/lia'
import { clearedCart, fetchCart } from '@/store/cartSlice'
import Image from 'next/image'
import { montserrat } from '@/app/layout'
import CartButton from './cartBtn1'

export default function ColItem({ items }) {
  const amountRef = React.useRef()
  const { data } = useSession();
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(fetchCart({
      uid:data?.user?.uid, 
      item:{
        id : items.id,
        name : items.name,
        price : items.price,
        imageUrl : items.imageUrl,
        amount : +amountRef.current.value
      },
      type : "PRODUCT"
    }));
  };
  return (
    <div className={`${montserrat.className}`}>
      <div className="flex items-center justify-end py-3 border-b px-3 ">
        <LiaTimesCircle
          className='text-3xl cursor-pointer text-textGray'                  
          onClick={()=>dispatch(clearedCart({ uid : data?.user?.uid, id : items.id, name : items.name }))}
        />
      </div>
      <div className="py-3 flex items-center justify-center border-b">
        <Image
          src={items.imageUrl}
          alt='carts'
          width={80}
          height={80}
          className=""
        />
      </div>
      <div className="py-3 flex items-center px-3 justify-between border-b text-sm sm:text-md space-x-2">
        <p className='font-semibold'>Product:</p>
        <p>{items.name}</p>
      </div>
      <div className="py-3 flex items-center px-3 justify-between border-b text-sm sm:text-md space-x-2">
        <p className='font-semibold'>Price:</p>
        <p>${items.price.toFixed(2)}</p>
      </div>
      <div className="py-3 flex items-center px-3 justify-between border-b overflow-auto text-sm sm:text-md space-x-2">
        <p className='font-semibold'>Quantity:</p>
        <CartButton 
          ref={amountRef} 
          amount={items.amount}
          add={addToCart}/>
      </div>
      <div className="py-3 flex items-center px-3 justify-between text-sm sm:text-md space-x-2">
        <p className='font-semibold'>Subtotal:</p>
        <p>${(items.price * items.amount).toFixed(2)}</p>
      </div>
    </div>
  )
}
