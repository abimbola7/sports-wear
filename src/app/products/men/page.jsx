"use client"
import Card from '@/components/card';
import RowCard from '@/components/row-card';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Link from 'next/link';
import React from 'react'
import { FaThList } from 'react-icons/fa';
import { HiViewGrid } from 'react-icons/hi';
import { VscSettings } from 'react-icons/vsc';
import { db } from '../../../../firebase';
import { montserrat, oswald } from '@/app/layout';
import { usePathname } from 'next/navigation';
import { useFetchType } from '@/hooks/api';

export default function Men(params) {
  const pathname = usePathname();
  const { isLoading, error, products } = useFetchType("Men")
  console.log(isLoading, error, products);
  const [ layout, setLayout ] = React.useState('grid');
  // const [ isLoading, setIsLoading  ] = React.useState(false);
  // const [ products, setProducts ] = React.useState([])

  // React.useEffect(()=> {
  //   const fetchData  = async () => {
  //     setIsLoading(true)
  //     const q = query(collection(db, "products"), where('category', 'array-contains', 'Men'));
  //     await getDocs(q)
  //     .then(querySnaphot => {
  //       const newData = querySnaphot.docs.map(doc=>(
  //         {
  //           ...doc.data(), id:doc.id
  //         }
  //       ))
  //       console.log(newData)
  //       setProducts(newData);
  //       setIsLoading(false);
  //     })
  //   }
  //   fetchData();
  // }, [])

  return (
    <main
    className='min-h-screen mt-24 max-w-[92rem] mx-auto text-customBlack px-5 '
    >
    <div className={`flex text-textGray ${montserrat.className} text-md`}>
      <Link href={"/"} className="mr-1">Home </Link> {" / "}
      <p className='ml-1'>Men</p>
    </div>
    <div
    className='flex justify-between items-center text-textGray my-10 sticky top-0 z-[10]'
    >
      <p className='flex cursor-pointer'>
        <VscSettings className='text-xl rotate-90'/>
        <span className='ml-2'>Filter</span>
      </p>
      <div className='flex items-center space-x-3'>
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
