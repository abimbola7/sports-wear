import React from 'react'
import { getProviders } from "next-auth/react"
import SigninButton from '@/components/signinbutton';
import Image from 'next/image';




export default async function signIn() {
  const providers = await getProviders();
  return (
    <>
    <div
    className='flex flex-col items-center justify-center min-h-screen py-2 px-14 text-center'
    >
        <div className=''>
          <img
          src={'https://firebasestorage.googleapis.com/v0/b/sport-wear-store.appspot.com/o/site-logo-black.svg?alt=media&token=43d164a3-8b8f-4bc2-b7b5-8e4262828fae'}
          alt="image"
          className=' w-80'
           />

          {providers && Object.values(providers).map((provider) => (
            <div key={provider.name} className="mt-20">
              <SigninButton name={provider.name} id={provider.id} providers={providers}/>
            </div>
          ))}
        </div>
    </div>
    </>
  )
}

// async function getData() {
//   const providers= await getProviders();
//   return providers;
// }