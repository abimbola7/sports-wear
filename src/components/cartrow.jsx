import { montserrat } from '@/app/layout'
import { clearedCart, fetchCart } from '@/store/cartSlice'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { LiaTimesCircle } from 'react-icons/lia'
import { useDispatch, useSelector } from 'react-redux'
import CartButton from './cartBtn1'

export default function CartRow({ items }) {
  const isLoading = useSelector(state=>state.cart.isLoading);
  const dispatch = useDispatch()
  const amountRef = React.useRef();
  const { data } = useSession()
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
                  <tr 
                    key={items.id}
                    className={`bg-white border-b ${montserrat.className}`}
                    >
                        <th scope="row" className="px-2 py-2">
                          <Image
                            src={items.imageUrl}
                            alt='carts'
                            width={60}
                            height={60}
                            className="min-w-[60px]"
                          />
                        </th>
                        <td className="p-2">
                          <Link className='transition-colors duration-300 hover:text-darkOrange' href={`products/${items.id}`}>
                            { items.name }
                          </Link>
                        </td>
                        <td className="p-2">
                            ${ items.price.toFixed(2) }
                        </td>
                        <td className="p-2">
                          <CartButton 
                          ref={amountRef} 
                          amount={items.amount}
                          add={addToCart}/>
                        </td>
                        <td className="flex items-center p-2 pt-6 space-x-2 text-right">
                            <p>${(items.price * items.amount).toFixed(2)}</p>
                            <LiaTimesCircle 
                            className='text-3xl cursor-pointer text-textGray'
                            onClick={()=>dispatch(clearedCart({ uid : data?.user?.uid, id : items.id, name : items.name }))}
                            />
                        </td>
                    </tr>
  )
}
