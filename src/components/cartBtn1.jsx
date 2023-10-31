/* eslint-disable react/display-name */
"use client"


import React, { forwardRef } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

const CartButton = React.forwardRef(
  (props, ref) => {

    const cartSubstract = () => {
      if (ref.current.value <= 1){
        return;
      }
      ref.current.value--
      props.add();
    }
    
    const cartAdd = () => {
      ref.current.value++
      props.add();
    }
    return (
              <div className="flex justify-between items-center bg-lightGrayishBlue w-[120px] text-lg border border-[#a6a5ad] font-extralight">
                  <button
                  onClick={cartSubstract}
                  className="hover:text-opacity-60 w-full flex justify-center"
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
                  className={`hover:text-opacity-60 w-full flex justify-center`}
                  >
                    <AiOutlinePlus />
                  </button>
              </div>
    )
  }
) 


export default CartButton;