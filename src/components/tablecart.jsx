import { montserrat } from '@/app/layout';
import Image from 'next/image'
import React from 'react'
import { LiaTimesCircle } from 'react-icons/lia';
import CartButton from './cartBtn1'
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { clearedCart } from '@/store/cartSlice';
import CartRow from './cartrow';

export default function TableCart({ cart }) {
  return (    
    <div className="relative overflow-x-auto shadow-md">
        <table className="w-full text-left text-gray-500 dark:text-gray-400 text-sm">
            <thead className={`text-gray-700 ${montserrat.className} text-md border  bg-[#F7F7F7]`}>
                <tr>
                    <th scope="col" className="px-6 py-3">
                        
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Subtotal
                    </th>
                </tr>
            </thead>
            <tbody className='text-customBlack'>
                {
                  cart.map(items=>(
                    <CartRow key={items.id} items={items} />
                  ))
                }
            </tbody>
        </table>
    </div>
  )
}
