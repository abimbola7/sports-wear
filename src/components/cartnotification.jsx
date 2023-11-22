"use client"

import { montserrat } from '@/app/layout'
import { hideNotification } from '@/store/uiSlice'
import React from 'react'
import { TiTickOutline } from 'react-icons/ti'
import { useDispatch, useSelector } from 'react-redux'
import { RiErrorWarningLine } from "react-icons/ri"
import { easeOut, motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function CartNotification() {
  const currentPath = usePathname();
  const notification = useSelector(state=>state.ui.notification);
  const name = useSelector(state=>state.cart.cartName)
  const [ visible, setVisible ]= React.useState(false);
  const dispatch = useDispatch();
  React.useEffect(()=>{
    if (notification) {
      setVisible(true)
       const timer = setTimeout(() => {
        setVisible(false)
        setTimeout(() => {
          dispatch(hideNotification())
        }, 1000);
      }, 2500);
  
      return () => {
        clearTimeout(timer)
      } 
    }
  }, [dispatch, notification])
  
  return (
    <AnimatePresence>
      {
        visible && currentPath !== "/cart" && (
          <motion.div
          initial={{
            x : "-100%"
          }}
          animate={{
            x :"0%"
          }}    
          exit={{
            x : "100%"
          }}
          transition={{
            type : "spring"

          }}
          className={`p-4 mt-3 border-t-4 ${notification?.status === "success" && "border-t-black bg-[#f0f0f0]"} ${notification?.status === "error" && "border-t-red-500 bg-red-100"} flex ${montserrat.className} fixed -top-2 z-[1000] w-full`}>
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
          </motion.div>
        )
      }
    </AnimatePresence>
  )
}
