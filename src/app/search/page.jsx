"use client"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSearch } from '@/store/productsSlice'
import Editbar from '@/components/editbar';
import Link from 'next/link';
import RowCard from '@/components/row-card';
import Card from '@/components/card';
import { montserrat } from '../layout';
import { useRouter } from 'next/navigation';

export default function Search({ searchParams }) {
  const router = useRouter()
  const { searchTerm } = searchParams;
  const products = useSelector(state=>state.products.search);
  const isLoading = useSelector(state=>state.products.isLoading);
  const error = useSelector(state=>state.products.error);
  const dispatch = useDispatch();
  const [ layout, setLayout ] = React.useState('grid');
  React.useEffect(()=>{
    dispatch(fetchSearch(searchTerm))
  }, [dispatch, searchTerm])
  return (
    <main
    className='min-h-screen mt-24 max-w-[92rem] mx-auto text-customBlack px-5 '
    >
    <div className={`flex text-textGray ${montserrat.className} text-md`}>
      <Link href={"/"} className="mr-1">Home </Link> {" / "}
      <Link href={"/products"} className='ml-1'>Shop</Link> {" /"}
      <p>Search results for &quot;{searchTerm}&quot;</p>
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
              {error}
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
