import React from 'react'
import { useSelector } from 'react-redux'


export default function AddCart({ onAdd }) {
  const isLoading = useSelector(state=>state.cart.isLoading);
  const addCart = () => {
    onAdd()
  }
  return (
    <button
      disabled={isLoading}
      onClick={addCart}
      className={`uppercase font-semibold flex-1 py-2 tracking-wider text-sm bg-darkOrange ${isLoading && 'bg-opacity-25'} rounded-3xl text-[#F7F7F7] px-3 mt-3 sm:mt-0 flex items-center justify-center`}>
      Add to Cart
      {
        isLoading && <img src='/infinity.svg' className='!ml-3 w-6'/>
      }
    </button>
  )
}
