"use client"

import React from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

export default function CartBtn() {
  return (
            <div className="flex justify-between items-center bg-lightGrayishBlue sm:w-[100px] py-1 px-3 text-lg border border-[#a6a5ad]">
                <button
                // onClick={cartSubstract}
                className="hover:text-opacity-60"
                >
                  <AiOutlineMinus />
                </button>
                <input 
                // ref={ref}
                type="number" 
                className="w-10 text-center text-black focus:outline-none bg-grey-500 border-l border-r border-[#8B8A93] pl-1" 
                defaultValue={1} 
                disabled/>
                <button
                // onClick={cartAdd}
                className={`hover:text-opacity-60`}
                >
                  <AiOutlinePlus />
                </button>
            </div>
  )
}
