import Link from 'next/link'
import React from 'react'

export default function Products() {
  return (
    <main
    className='min-h-screen border mt-24'
    >
    <div className='flex'>
      <Link href={"/"}>Home</Link> {"/"}
      <p>Shop</p>
    </div>
    </main>
  )
}
