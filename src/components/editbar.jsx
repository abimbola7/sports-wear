import React from 'react'
import { FaThList } from 'react-icons/fa'
import { HiViewGrid } from 'react-icons/hi'
import { VscSettings } from 'react-icons/vsc'
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '@/store/modalSlice';

export default function Editbar({ setLayout, layout }) {
  const dispatch = useDispatch();
  const isFilter = useSelector(state=>state.modal.filterIsToggled)
  console.log(isFilter)
  return (
    <div
      className='flex justify-between items-center text-textGray my-10 sticky top-0 z-[10]'
    >
      <p 
      onClick={()=>dispatch(modalActions.toggleFilter())}
      className='flex cursor-pointer'>
        <VscSettings className='text-xl rotate-90'/>
        <span 
        className='ml-2'>Filter</span>
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
  )
}
