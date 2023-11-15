"use client"
import { oswald } from '@/app/layout'
import React from 'react'
import { FaBicycle, FaCampground, FaHeadSideMask, FaHiking, FaShoePrints, FaSuitcaseRolling, FaTshirt, FaVestPatches } from 'react-icons/fa'
import Icons from './icons';
import { motion } from 'framer-motion';

export default function Explore() {
  const collection = [
    {
      name : "Face Masks",
      icon : <FaHeadSideMask />
    },
    {
      name : "Apparel",
      icon : <FaTshirt />
    },
    {
      name : "Packs & Gear",
      icon : <FaSuitcaseRolling />
    },
    {
      name : "Footwear",
      icon : <FaShoePrints />
    },
    {
      name : "Bicycle",
      icon : <FaBicycle />
    },
    {
      name : "Equipment",
      icon : <FaHiking />
    },
    {
      name : "Outwear",
      icon : <FaVestPatches />
    },
    {
      name : "Tents",
      icon : <FaCampground />
    },
  ]
  return (
    <section className='mt-20'>
    <h1 className={`text-center text-xl font-medium ${oswald.className}`}>Explore Collection</h1>
      <motion.div
      transition={{
      staggerChildren : .1,
      staggerDirection: -1
      }}
       className="grid grid-cols-2 md:grid-cols-4 max-w-[90rem] py-20 mx-auto justify-items-center gap-x-5 gap-y-10 px-4 sm:px-0">
        {
          collection.map(collection=>(
            <Icons
            key={collection.name}
            name={collection.name}
            icon={collection.icon}
            />
          ))
        }
      </motion.div>
    </section>
  )
}
