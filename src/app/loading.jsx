import React from 'react'

export default function Loading() {
  return (
    <div
    className="flex justify-center min-h-screen w-full items-center"
    >
      <img className='h-96' src="spinner.svg" alt="loading..." />
    </div>
  )
}
