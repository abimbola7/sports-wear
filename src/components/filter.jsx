"use client"
import { montserrat, oswald } from '@/app/layout'
import React, { useState } from 'react';
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import { LiaTimesSolid } from 'react-icons/lia';
import { useSearchParams, useRouter } from 'next/navigation';


export default function Filter() {
  const [minValue, setMinValue] = useState(10);
  const [maxValue, setMaxValue] = useState(130);
  const router = useRouter();
  const searchParams = useSearchParams();
  // const [ buttonHandler, setButtonHandler ] = useState(false);

  const filterPrice = () => {
   router.push(`/filter/?minValue=${minValue}&maxValue=${maxValue}`) 
  }
  
  const inputHandler = (e) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);

  } 

  return (
    <>
      {
        (
          <div 
          // onClick={()=>dispatch(modalActions.toggleCart())}
          className='fixed top-0 w-full h-screen bg-black bg-opacity-40' />
        )
      }
      <div className={`top-0 left-0 h-screen w-[33rem] max-w-full bg-white fixed z-[100000] transition-transform duration-200 ease-out'}`}>
        <div className='flex items-center justify-end px-3 py-3'>
          <LiaTimesSolid  
          
          className='text-2xl cursor-pointer'/>
        </div>
        <div className="px-10">
          <h2 className={`${oswald.className} text-2xl`}>Filter by price</h2>
          <div>
            <MultiRangeSlider
            min={10}
            max={130}
            onInput={inputHandler}
            onLoad={(e)=>{
              e.minValue = 10;
              e.maxValue = 130;
            }}
            label={false}
            ruler={false}
            style={{ border: "none", boxShadow: "none", padding: "5px 5px" }}
            className="mt-5 "
            barLeftColor="#dddddd"
            baseClassName='multi-range-slider'
            barInnerColor="#FB5733"
            barRightColor="#dddddd"
            thumbLeftColor="#131316"
            thumbRightColor="#131316"
          />
          <div className={`text-sm text-textGray font-semibold flex items-center justify-between px-2 w-full mt-6 ${montserrat.className}`}>
            <span>${minValue}</span>
            <span>${maxValue}</span>
          </div>

          <div className='flex items-center justify-end mt-6 space-x-4'>
            <button 
            onClick={filterPrice}
            className='px-5 py-1 text-sm font-medium text-white rounded-3xl bg-darkOrange'>APPLY</button>
          </div>
        </div>
        </div>
        <div>
          <h2 className={`${oswald.className} text-2xl`}>Filter by Categories</h2>
        </div>
      </div>
    </>
  )
}
