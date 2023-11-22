"use client"
import React from 'react'
import { useFetchType } from '@/hooks/api';
import ProductType from '@/components/productType';


export default function Women(params) {
  const { isLoading, error, products, memoizedFetchData } = useFetchType({type: "category", cat : "Women"})
  return (
    <ProductType
    type="Women"
    isLoading={isLoading}
    error={error}
    products={products}
    memoizedFetchData={memoizedFetchData}
    />
  )
}
