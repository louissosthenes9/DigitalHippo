"use client"
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/payload-types";

export default function AddToCartButton({product,}:{
    product : Product
}) {
    const {addItem} = useCart()

    const [isSuccess,setIsSuccess] = useState(false)

    useEffect(()=>{
       const timeout = setTimeout(()=>{
        setIsSuccess(false)
       },2000)

       return () => clearTimeout(timeout)
    },[isSuccess])

  return (
    <Button size="lg" className="w-full" onClick={()=>{
        addItem(product)
        setIsSuccess(true)
    }}>
          {isSuccess ? 'Added!' : 'Add to cart'}
    </Button>
  )
}
