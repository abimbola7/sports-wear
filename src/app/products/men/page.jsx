"use client"
import Card from '@/components/card';
import RowCard from '@/components/row-card';
import Link from 'next/link';
import React from 'react'
import { montserrat, oswald } from '@/app/layout';
import { usePathname } from 'next/navigation';
import { useFetchType } from '@/hooks/api';
import Editbar from '@/components/editbar';

export default function Men(params) {
  const pathname = usePathname();
  const { isLoading, error, products, memoizedFetchData } = useFetchType({type: "category", cat : "Men"})
  const [ layout, setLayout ] = React.useState('grid');
  
  return (
    <main
    className='min-h-screen mt-24 max-w-[92rem] mx-auto text-customBlack px-5 '
    >
      <div className={`flex text-textGray ${montserrat.className} text-md`}>
        <Link href={"/"} className="mr-1">Home </Link> {" / "}
        <p className='ml-1'>Men</p>
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
              Something went wrong
              <button 
                onClick={()=>memoizedFetchData()}
                className={`bg-darkOrange px-4 py-2 rounded-3xl text-white ml-3 ${montserrat.className}`}>
                  Try again
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
