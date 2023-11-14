"use client"

import React from 'react'
import { useFetchType } from '@/hooks/api'
import Link from 'next/link';
import { montserrat } from '@/app/layout';
import Editbar from '@/components/editbar';
import Card from '@/components/card';
import RowCard from '@/components/row-card';
import { useRouter } from 'next/navigation';


export default function FilterTerm({ params, searchParams }) {
  const router = useRouter()
  const [ layout, setLayout ] = React.useState('grid');
  const { minValue, maxValue } = searchParams
  const { isLoading, products, error } = useFetchType({type: "filter", minValue, maxValue});
  // console.log("wrongthing")
  return (
    <main
    className='min-h-screen mt-24 max-w-[92rem] mx-auto text-customBlack px-5 '
    >
    <div className={`flex text-textGray ${montserrat.className} text-md`}>
      <Link href={"/"} className="mr-1">Home </Link> {" / "}
      <p className='ml-1'>Women</p>
    </div>
    <Editbar  
      layout={layout}
      setLayout={setLayout}
    />
    {
          isLoading && !error && !products && (
            <div className='flex justify-center'>
              <img 
              src="/spinner.svg" 
              alt="" className='h-20'/>
            </div>
          ) 
    }
    {
          !isLoading && error && (
            <div className={`${montserrat.className} text-center w-full`}>
              Could not find item
              <button 
                onClick={()=>router.back()}
                className={`bg-darkOrange px-4 py-2 rounded-3xl text-white ml-3 ${montserrat.className}`}>
                  Go Back
              </button>
            </div>
          ) 
    }
    {
      !isLoading && !error && products &&(
              <>
                {
                  layout === "grid" ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
                      {
                        products && products.map(latest=>(
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
                  ) : (
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 justify-items-center">
                      {
                        products && products.map(latest=>(
                          <RowCard 
                          key={latest.id}
                          id={latest.id}
                          imageUrl={latest.imageUrl}
                          name={latest.name}
                          price={latest.price}
                          desc={latest.description}
                          />
                        ))
                      }
                    </div>
                  )
                }
              </>
          )
        }
    </main>
  )
}