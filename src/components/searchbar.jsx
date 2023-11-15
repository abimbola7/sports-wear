"use client"

import { montserrat } from '@/app/layout'
import React from 'react'
import { AiOutlineRight } from 'react-icons/ai'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { modalActions } from '@/store/modalSlice';
import { useDispatch } from 'react-redux';

export default function SearchBar({ minValue, maxValue }) {
  const dispatch = useDispatch()
  const router = useRouter();
  const pathname =  usePathname()
  const [ search, setSearch ] = React.useState('');
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      return;
    }
    router.push(`/search?searchTerm=${search}`)
    setTimeout(() => {
      dispatch(modalActions.toggleFilter())
    }, 500);
  }

  return (
    <form 
    onSubmit={handleSearch}
    className={`flex ${montserrat.className}`}>
      <input 
      onChange={(e)=>setSearch(e.target.value)}
      type="text"
      placeholder="Search Products..."
      className='focus:border-dotted p-2 focus:outline-none border text-lg flex-grow'
       />
      <button 
      className="p-3 bg-darkOrange hover:bg-opacity-50 ml-3 rounded-3xl text-white">
        <AiOutlineRight />
      </button>
    </form>
  )
}



















