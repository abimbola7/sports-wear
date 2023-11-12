"use client"

import { montserrat } from '@/app/layout'
import { hideNotification } from '@/store/uiSlice'
import React from 'react'
import { TiTickOutline } from 'react-icons/ti'
import { useDispatch, useSelector } from 'react-redux'
import { RiErrorWarningLine } from "react-icons/ri"

export default function CartNotification() {
  const notification = useSelector(state=>state.ui.notification);
  console.log(notification?.status)
  const name = useSelector(state=>state.cart.cartName)
  const [ visible, setVisible ]= React.useState(false);
  const dispatch = useDispatch()
  React.useEffect(()=>{
    if (notification) {
      setVisible(true)

      // if (cart?.length === 0) {
      //   return
      // }
  
       const timer = setTimeout(() => {
        setVisible(false)
        dispatch(hideNotification())
      }, 2500);
  
      return () => {
        clearTimeout(timer)
      } 
    }
  }, [dispatch, notification])
  
  return (
    <div className={`p-4 mt-3 border-t-4 ${notification?.status === "success" && "border-t-black bg-[#8a8989]"} ${notification?.status === "error" && "border-t-red-500 bg-red-100"} ${ visible ? 'flex' : 'hidden' } ${montserrat.className} fixed -top-3 z-[1000] w-full`}>
      {
        notification && notification.type === "add" && (
          <div className='sm:text-md text-lg flex items-center'><TiTickOutline className='flex-shrink-0 mr-3' /> {name} has been added to cart!</div>
        )
      }
      {
        notification && notification.type === "delete" && (
          <div className='sm:text-md text-lg flex items-center'><TiTickOutline className='flex-shrink-0 mr-3' /> {name} has been deleted from cart!</div>
        )
      }
      {
        notification && notification.type === "error" && (
          <div className='sm:text-md text-lg flex items-center'><RiErrorWarningLine className='flex-shrink-0 mr-3'/>Error updating cart</div>
        )
      }
    </div>
  )
}
