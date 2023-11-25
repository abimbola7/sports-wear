"use client"

import React from 'react'
import { useFetchType } from '@/hooks/api'
import ProductType from '@/components/productType';


export default function FilterTerm({ params, searchParams }) {
  const { minValue, maxValue } = searchParams
  const { isLoading, products, error } = useFetchType({type: "filter", minValue, maxValue});
  return (
    <ProductType
    type="Shop"
    isLoading={isLoading}
    error={error}
    products={products}
    maxValue={searchParams.maxValue}
    minValue={searchParams.minValue}
    classes="filter"
    />
  )
}
