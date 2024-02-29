"use client";
import { PRODUCT_CATEGORIES } from '@/config';
import React, { useEffect, useRef, useState } from 'react'
import NavItem from './NavItem';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';
import { handler } from 'tailwindcss-animate';

export default function NavItems() {
  const  [activeindex,setActiveIndex] = useState<null | number>(null);
  const isAnyOpen= activeindex !== null;
  const navRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(navRef,()=>setActiveIndex(null));
  useEffect(()=>{
              const handler=(e: KeyboardEvent)=>{
                if(e.key==="Escape"){
                  setActiveIndex(null)
                }
              }
              document.addEventListener("keydown",
                 handler
             )
             return ()=>{
              document.removeEventListener("keydown",handler)
             }
  },[])

  return(
    <div className='flex gap-4 h-full ' ref={navRef}>
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
 