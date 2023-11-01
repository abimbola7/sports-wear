import { montserrat } from '@/app/layout'
import React from 'react'
import { hideNotification } from '@/store/uiSlice';
import { useDispatch} from 'react-redux';
import { TiTick, TiTickOutline } from "react-icons/ti"
import { MdErrorOutline } from 'react-icons/md';

export default function Notify({ status, message, cart }) {
  const [ visible, setVisible ]= React.useState(false);
  const dispatch = useDispatch()
  React.useEffect(()=>{
    setVisible(true)

    if (cart?.length === 0) {
      return
    }

     const timer = setTimeout(() => {
      setVisible(false)
      dispatch(hideNotification())
    }, 2500);

    return () => {
      clearTimeout(timer)
    }
  }, [dispatch])
  return (
    <div className={`p-4 mt-3 border-t-4 ${ status === "success" ? 'border-t-black' : 'border-t-red-500' } bg-[#f7f7f7] ${visible ? 'flex' : 'hidden'} items-center space-x-3 ${montserrat.className} text-lg sticky top-1 z-[1000]`}>
      {status === "success" && <TiTickOutline className='flex-shrink-0' />}
      {status === "error" && <MdErrorOutline className='text-red-500 flex-shrink-0'/>}
      <p className='text-sm sm:text-md'>{message}</p>
    </div>
  )
}
