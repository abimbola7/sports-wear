"use client"

import React from 'react'
import { useFetchType } from '@/hooks/api'


export default function FilterTerm({ params, searchParams }) {
  const { minValue, maxValue } = searchParams
  const { isLoading, products, error } = useFetchType({type: "filter", minValue, maxValue});
  console.log(products);
  console.log(params, searchParams)
  return (
    <div>Filter</div>
  )
}
