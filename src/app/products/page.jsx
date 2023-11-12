"use client"
import Link from 'next/link'
import React from 'react'
import { montserrat, oswald } from '../layout'
import { VscSettings } from "react-icons/vsc"
import { HiViewGrid } from "react-icons/hi";
import { FaThList } from "react-icons/fa";
import Card from '@/components/card'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import RowCard from '@/components/row-card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '@/store/productsSlice'
import Editbar from '@/components/editbar'


export default function Products() {
  const reduxProducts = useSelector(state=>state.products.products);
  const reduxIsLoading = useSelector(state=>state.products.isLoading);
  const reduxError = useSelector(state=>state.products.error);
  console.log(reduxIsLoading)
  const dispatch = useDispatch();
  const [ layout, setLayout ] = React.useState('grid');
  const [ isLoading, setIsLoading  ] = React.useState(false);
  const [ products, setProducts ] = React.useState([])

  React.useEffect(()=>{
    console.log("does it work")
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <main
    className='min-h-screen mt-24 max-w-[92rem] mx-auto text-customBlack px-5 '
    >
    <div className={`flex text-textGray ${montserrat.className} text-md`}>
      <Link href={"/"} className="mr-1">Home </Link> {" / "}
      <p className='ml-1'>Shop</p>
    </div>
    <Editbar  
      layout={layout}
      setLayout={setLayout}
    />
    {
          reduxIsLoading && reduxProducts.length === 0 ? (
            <div className='flex justify-center'>
              <img 
              src="/spinner.svg" 
              alt="" className='h-20'/>
            </div>
          ) : (
              <>
                {
                  layout === "grid" ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
                      {
                        reduxProducts && reduxProducts.map(latest=>(
                          <Card 
                          amount={latest.amount}
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
                        reduxProducts && reduxProducts.map(latest=>(
                          <RowCard 
                          key={latest.id}
                          id={latest.id}
                          imageUrl={latest.imageUrl}
                          name={latest.name}
                          price={latest.price}
                          desc={latest.description}
                          amount={latest.amount}
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
