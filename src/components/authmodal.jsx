"use client"
import { montserrat, oswald } from '@/app/layout';
import { modalActions } from '@/store/modalSlice';
import { signIn } from 'next-auth/react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

export default function AuthModal() {
  const dispatch = useDispatch();
  const auth = useSelector(state=>state.modal.authIsToggled)
  return (
    <AnimatePresence>
      {
        auth && (
          <motion.div
          key={"modal"}
          initial={{
            opacity: 0
          }} 
          animate={{
            opacity: 1
          }}
          exit={{
            opacity : 0
          }}
          className="w-full h-screen fixed bg-black bg-opacity-40 z-[200] top-0" onClick={()=>dispatch(modalActions.toggleAuth())}>
            <motion.div 
            initial={{
              y : -500,
            }}
            animate={{
              y : 0,
            }}
            exit={{
              y : -1000
            }}
            transition={{
              type : "spring",
              stiffness : 150
            }}
            className={`border px-4 py-10 top-0 right-0 bottom-0 left-0 mx-auto my-auto absolute w-[27rem] max-w-[95%] rounded-xl bg-white space-y-4  ${montserrat.className} text-center h-fit `}>
              <div className='flex justify-center'>
                <img
                src={'https://firebasestorage.googleapis.com/v0/b/sport-wear-store.appspot.com/o/site-logo-black.svg?alt=media&token=43d164a3-8b8f-4bc2-b7b5-8e4262828fae'}
                alt="image"
                className='text-center w-56'
                />
              </div>
                <h1 className={`text-3xl font-medium ${oswald.className}`}>Please log in to continue</h1>
                <p className="font-medium">You need to be logged in to access this feature.</p>
                <div className='!mt-6'>
                  <button 
                  className="bg-darkOrange  rounded-3xl py-3 px-6 text-white"
                  onClick={signIn}
                  >
                    Log in/Sign up
                  </button>  
                </div>
            </motion.div>
          </motion.div>
        )
      }

    </AnimatePresence>
  )
}
