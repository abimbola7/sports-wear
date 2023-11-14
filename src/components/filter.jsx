"use client"
import { montserrat, oswald } from '@/app/layout'
import React, { useState } from 'react';
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import { LiaTimesSolid } from 'react-icons/lia';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { modalActions } from '@/store/modalSlice';
import { usePathname, useParams } from 'next/navigation';
import { useFetchType } from '@/hooks/api';
import SearchBar from './searchbar';
import Link from 'next/link';


export default function Filter() {
  const pathname  = usePathname();
  const searchTerm = useSearchParams().get('searchTerm');
  console.log(pathname)
  const dispatch = useDispatch()
  const isFilter = useSelector(state=>state.modal.filterIsToggled)
  const [minValue, setMinValue] = useState(10);
  const [maxValue, setMaxValue] = useState(130);
  const router = useRouter();
  const { products:menProducts } = useFetchType({type: "category", cat : "Men"})
  const { products:womenProducts } = useFetchType({type: "category", cat : "Women"})
  const { products:packsAndGears } = useFetchType({type: "category", cat : "Packs & Gear"})
  const filterCategories = [
    { name : "Men", amount : menProducts?.length },
    { name : "Women", amount : womenProducts?.length },
    { name : "Packs & Gear", amount : packsAndGears?.length },
  ]

  const filterPrice = () => {
   router.push(
    `${pathname === "/products" ? "/products/filter" :
        pathname === "/products/men" ? "/products/men/filter" :
        pathname === "/products/women" ? "/products/women/filter" :
        pathname ===  "/search" ? `/search/filter?searchTerm=${searchTerm}` :
        pathname
      }${pathname === "/search" ? "&" : pathname === "/search/filter" ? `?searchTerm=${searchTerm}&`: "?"}minValue=${minValue}&maxValue=${maxValue}`)
   setTimeout(() => {
    dispatch(modalActions.toggleFilter())
    }, 500);
  }
  
  const inputHandler = (e) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);

  } 

  return (
    <>
      {
        isFilter &&
        (
          <div 
          onClick={()=>dispatch(modalActions.toggleFilter())}
          className='fixed top-0 w-full h-screen bg-black bg-opacity-40' />
        )
      }
      <div className={` space-y-12 top-0 left-0 h-screen w-[25rem] max-w-full bg-white fixed z-[100000] transition-transform duration-200 ease-out ${!isFilter ? "-translate-x-[25rem]" : "translate-x-0"}`}>
        <div className='flex items-center justify-end px-3 py-3'>
          <LiaTimesSolid  
          
          className='text-2xl cursor-pointer'/>
        </div>
        <div className='px-10'>
          <SearchBar minValue={minValue} maxValue={maxValue} />
        </div>
        <div className="px-10 mt-4">
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
            className='px-8 py-3 text-sm font-medium text-white rounded-3xl bg-darkOrange'>APPLY</button>
          </div>
        </div>
        </div>
        <div className="px-10">
          <h2 className={`${oswald.className} text-2xl font-medium text-textGray`}>Filter by Categories</h2>
          <ul className={`${montserrat.className} text-xl mt-4`}>
            {filterCategories.map(cat=>(
              <li
              key={cat.name} 
              className="px-3 hover:text-darkOrange transition-colors duration-200"
              >
                <Link 
                href={`/products/${cat.name.toLowerCase()}`} 
                >{cat.name} <span className='ml-1'>({cat.amount})</span></Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
