"use client"
import Link from 'next/link'
import React from 'react'
import { BsArrowRight } from "react-icons/bs"
import { oswald, montserrat } from '@/app/layout'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import Card from './card'

export default function LatestDrop() {
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ latestProducts, setLatestProducts ] = React.useState([]);

  React.useEffect(()=> {
    const fetchLatestData  = async () => {
      setIsLoading(true)
      const q = query(collection(db, "products"), where("latest", "==", true));
      await getDocs(q)
      .then(querySnaphot => {
        const newData = querySnaphot.docs.map(doc=>(
          {
            ...doc.data(), id:doc.id
          }
        ))
        setLatestProducts(newData);
        setIsLoading(false);
      })
    }
    fetchLatestData();
  }, [])

  return (
    <section className='px-4'>
      <div className='max-w-7xl mx-auto'>
        <div className={`flex items-center justify-between ${oswald.className} text-xl my-10`}>
          <h2 className='text-2xl font-medium'>The Latest Drop</h2>
          <Link
          href="products"
          className='text-darkOrange hover:text-customBlack'
          >SHOP ALL
          <BsArrowRight className='inline-flex ml-1 pb-1'/>
          </Link>
        </div>
        {
          isLoading ? (
            <div className='flex justify-center'>
              <img 
              src="/spinner.svg" 
              alt="" className='h-20'/>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
              {
                latestProducts && latestProducts.map(latest=>(
                  <Card 
                  key={latest.id}
                  id={latest.id}
                  imageUrl={latest.imageUrl}
                  name={latest.name}
                  price={latest.price}
                  />
                ))
              }
            </div>
          )
        }
      </div>
    </section>
  )
}