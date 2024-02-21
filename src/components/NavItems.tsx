"use client";
import { PRODUCT_CATEGORIES } from '@/config';
import React, { useState } from 'react'
import NavItem from './NavItem';

export default function NavItems() {
  const  [activeindex,setActiveIndex] = useState<null | number>(null);
  const isAnyOpen= activeindex !== null;
  return(
    <div className='flex gap-4 h-full '>
      {PRODUCT_CATEGORIES.map((category,i)=>{
         const handleOpen = ()=>{
           if(activeindex===i){
            setActiveIndex(null) 
           }else{
            setActiveIndex(i)
           }
        }
        const isOpen =(i === activeindex)
        return (
          <NavItem 
          category={category} 
          handleOpen={handleOpen} 
          isOpen={isOpen} 
          isAnyOpen = {isAnyOpen}
          key={category.value}
          />
        )
      })}
    </div>
  )
  
}
