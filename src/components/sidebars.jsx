"use client"
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hamburgerToggler } from '@/store/uiSlice'
import { LiaTimesSolid } from "react-icons/lia"
import Link from 'next/link'
import { montserrat } from '@/app/layout'
import { usePathname} from 'next/navigation'

export default function SideBars() {
  const dispatch = useDispatch();
  const pathName = usePathname()
  const hamburgerState = useSelector(state=>state.ui.hamburgerIsToggled) 
  return (
    <div className={`${!hamburgerState && "hidden"} w-full h-screen bg-white fixed z-[100000] md:hidden`}>
      <div className="py-4 flex items-center justify-end px-4">
        <LiaTimesSolid 
        onClick={()=>dispatch(hamburgerToggler())}
        className='text-3xl cursor-pointer'/>
      </div>

      <ul className={`flex flex-col space-y-5 ${montserrat.className} font-light text-lg text-center`}>
        {[  
          ['home', "/"],
          ['shop', "/products"],
          ['men', "/products/men"],
          ['women', "/products/women"],
          ['cart', "/cart"],
          ['contact', "/contact"],
        ].map(([items, link])=>(
          <li 
          key={items} 
          className={`py-2 hover:text-darkOrange capitalize ${pathName === link && "text-darkOrange"}`}
          >
            <Link 
            href={link} 
            className="w-fit"
            onClick={()=>dispatch(hamburgerToggler())}
            >
              {items}
            </Link>
          </li>
        ))
        }
      </ul>
    </div>
  )
}
