import React from 'react'

export default function CartLoading() {
  return (
    <div className='p-4 border animate-pulse cursor-wait'>
      <div className="w-full h-6 bg-gray-500 rounded-sm"></div>
      <div className="grid w-full grid-cols-6 mt-6 gap-x-5">
        <div className="bg-gray-500 border"></div>
        <div className="flex flex-col col-span-5 space-y-5">
          <div className='h-3 bg-gray-500'></div>
          <div className='h-3 bg-gray-500'></div>
          <div className='w-1/2 h-3 bg-gray-500'></div>
        </div>
      </div>
      <div className="grid w-full grid-cols-6 mt-10 gap-x-5">
        <div className="bg-gray-500 border"></div>
        <div className="flex flex-col col-span-5 space-y-5">
          <div className='h-3 bg-gray-500'></div>
          <div className='h-3 bg-gray-500'></div>
          <div className='w-1/2 h-3 bg-gray-500'></div>
        </div>
      </div>
    </div>
  )
}
