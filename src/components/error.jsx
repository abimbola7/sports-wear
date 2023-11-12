import { montserrat } from '@/app/layout'
import React from 'react'

export default function ErrorComp({ error }) {
  return (
    <div className={`${montserrat.className} text-center w-full`}>
      {error} 
      <button 
        // onClick={()=>dispatch(fetchLatest())}
        className={`bg-darkOrange px-4 py-2 rounded-3xl text-white ml-3 ${montserrat.className}`}>
          Try again
      </button>
    </div>
  )
}
