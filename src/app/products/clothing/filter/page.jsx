"use client"
import ProductType from '@/components/productType';
import { useFetchType } from '@/hooks/api';
import React from 'react'

export default function FilterMen({ params, searchParams }) {
  const [ layout, setLayout ] = React.useState('grid');
  const { minValue, maxValue } = searchParams
  const { isLoading, products, error, memoizedFetchData } = useFetchType({type: "filter", minValue, maxValue, cat : "Clothing"});
  return (
    <ProductType
    type="Clothing"
    isLoading={isLoading}
    error={error}
    products={products}
    maxValue={searchParams.maxValue}
    minValue={searchParams.minValue}
    classes="filter"
    memoizedFetchData={memoizedFetchData}
    />
  )
}