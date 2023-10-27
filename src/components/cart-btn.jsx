/* eslint-disable react/display-name */
"use client"


import React, { forwardRef } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

const CartBtn = React.forwardRef(
  (props, ref) => {
    const cartSubstract = () => {
      if (ref.current.value <= 1){
        return;
      }
      ref.current.value--
    }
    const cartAdd = () => {
      ref.current.value++
    }
    return (
              <div className="flex justify-between items-center bg-lightGrayishBlue w-[100px] px-3 text-lg border border-[#a6a5ad]">
                  <button
                  onClick={cartSubstract}
                  className="hover:text-opacity-60"
                  >
                    <AiOutlineMinus />
                  </button>
                  <input 
                  ref={ref}
                  type="number" 
                  className="w-12 text-center text-black focus:outline-none bg-grey-500 border-l border-r border-[#8B8A93] pl-3" 
                  defaultValue={1} 
                  disabled/>
                  <button
                  onClick={cartAdd}
                  className={`hover:text-opacity-60 w-full`}
                  >
                    <AiOutlinePlus />
                  </button>
              </div>
    )
  }
) 


export default CartBtn;