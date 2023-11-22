"use client"
import Link from 'next/link'
import React from 'react'
import { montserrat, oswald } from '../layout'
import Card from '@/components/card'
import RowCard from '@/components/row-card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '@/store/productsSlice'
import Editbar from '@/components/editbar'
import ProductType from '@/components/productType'


export default function Products() {
  const reduxProducts = useSelector(state=>state.products.products);
  const reduxIsLoading = useSelector(state=>state.products.isLoading);
  const reduxError = useSelector(state=>state.products.error);
  const dispatch = useDispatch();

  React.useEffect(()=>{
    dispatch(fetchProducts())
  }, [dispatch])

  const fetchProd = () => {
    dispatch(fetchProducts())
  }

  return (
    <ProductType
    type="Shop"
    isLoading={reduxIsLoading}
    error={reduxError}
    products={reduxProducts}
    memoizedFetchData={fetchProd}
    />
  )
}
