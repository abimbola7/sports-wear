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
              <div className="flex justify-between items-center bg-lightGrayishBlue w-[120px] text-lg border border-[#a6a5ad] font-extralight">
                  <button
                  onClick={cartSubstract}
                  className="flex justify-center w-full hover:text-opacity-60"
                  >
                    <AiOutlineMinus />
                  </button>
                  <input 
                  ref={ref}
                  type="number" 
                  className="w-14 text-center text-black focus:outline-none bg-grey-500 border-l border-r border-[#8B8A93] pl-3 text-md py-1" 
                  value={props.amount} 
                  disabled/>
                  <button
                  onClick={cartAdd}
                  className="flex justify-center w-full hover:text-opacity-60"
                  >
                    <AiOutlinePlus />
                  </button>
              </div>
    )
  }
) 


export default CartBtn;