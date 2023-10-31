import React from 'react'
import ColItem from './colitem'

export default function ColCart({ cart }) {
  return (
    <div className='border md:hidden mb-5'>
      {
        cart.map(item=>(
          <ColItem key={item.id} items={item}/>
        ))
      }
    </div>
  )
}
