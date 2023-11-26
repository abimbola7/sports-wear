import { montserrat, oswald } from '@/app/layout'
import Link from 'next/link'
import React from 'react'
import Card from './card'
import Editbar from './editbar'
import RowCard from './row-card'
import { useRouter } from 'next/navigation'

export default function ProductType({ isLoading, error, products, memoizedFetchData, type, minValue, maxValue, classes }) {
  const router = useRouter()
  const [ layout, setLayout ] = React.useState('grid');
  return (
    <main
    className='min-h-screen mt-24 max-w-[92rem] mx-auto text-customBlack px-5 '
    >
    <div className={`flex text-textGray ${montserrat.className} text-md`}>
      <Link href={"/"} className="mr-1">Home </Link> {" / "}
      <p className='ml-1'>{type}</p>
    </div>
    <Editbar  
    layout={layout}
    setLayout={setLayout}
    />
    {
      classes === "filter" && (
      <div className={`my-5 ${montserrat.className} space-y-3 text-sm`}>
        <h1 className={`${oswald.className} font-medium text-4xl !mb-3`}>Active Filter</h1>
        <span className='font-light'>Min ${minValue}</span>
        <span  className='ml-3 font-light'>Max ${maxValue}</span>
        <button 
        onClick={()=>router.back()}
        className="bg-darkOrange py-3 text-white block px-3 rounded-3xl w-fit hover:bg-opacity-50">Cancel Filter</button>
      </div>
      )
    }
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
          {classes !== 'filter' ? 'Something went wrong' : "Could not find item"}
          {
            classes !== "filter" ? (
            <button 
              onClick={()=>memoizedFetchData()}
              className={`bg-darkOrange px-4 py-2 rounded-3xl text-white ml-3 ${montserrat.className}`}>
                Try again
            </button>
            ) : (
            <button 
              onClick={()=>router.back()}
              className={`bg-darkOrange px-4 py-2 rounded-3xl text-white ml-3 ${montserrat.className}`}>
                Go Back
            </button>

            )
          }
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
