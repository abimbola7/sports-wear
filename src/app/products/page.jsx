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


export default function Products() {
  const [ layout, setLayout ] = React.useState('grid');
  const [ isLoading, setIsLoading  ] = React.useState(false);
  const [ products, setProducts ] = React.useState([])

  React.useEffect(()=> {
    const fetchData  = async () => {
      setIsLoading(true)
      const q = query(collection(db, "products"));
      await getDocs(q)
      .then(querySnaphot => {
        const newData = querySnaphot.docs.map(doc=>(
          {
            ...doc.data(), id:doc.id
          }
        ))
        setProducts(newData);
        setIsLoading(false);
      })
    }
    fetchData();
  }, [])

  return (
    <main
    className='min-h-screen mt-24 max-w-[92rem] mx-auto text-customBlack px-2'
    >
    <div className={`flex text-textGray ${montserrat.className} text-sm`}>
      <Link href={"/"} className="mr-1">Home </Link> {" / "}
      <p className='ml-1'>Shop</p>
    </div>
    <div
    className='flex justify-between items-center text-textGray my-10'
    >
      <p className='flex cursor-pointer'>
        <VscSettings className='text-xl rotate-90'/>
        <span className='ml-2'>Filter</span>
      </p>
      <div className='flex space-x-3 items-center'>
        <HiViewGrid 
        onClick={()=>setLayout('grid')}
        className={`text-3xl transition-transform hover:scale-110 duration-200 ease-out cursor-pointer ${ layout === "grid" && 'text-darkOrange'}`}/>
        <FaThList 
        onClick={()=>setLayout('list')}
        className={`text-2xl transition-transform hover:scale-110 duration-200 ease-out cursor-pointer ${ layout === "list" && 'text-darkOrange'}`}/>
      </div>
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
          )
        }
    </main>
  )
}
