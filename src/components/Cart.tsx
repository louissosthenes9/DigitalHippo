"use client";
import CartItem from "./CartItem";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "./ui/sheet";
import { ShoppingCart } from "lucide-react";
import { Separator } from "./ui/separator";
import { formatPrice } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { ScrollArea } from "./ui/scroll-area";

export default function Cart() {
  
  const {items} = useCart()
  const itemCount =items.length;
  const cartTotal = items.reduce((total,{product})=>total + product.price
  ,0
  )
  const fee = 1;
  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <ShoppingCart
          aria-hidden="true"
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-gray-500"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          0
        </span>
      </SheetTrigger>
      {/*This ui creates  cart that when it is clicked it pulls items */}
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart(0)</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              {/* Todo: add cart logic here */}
               <ScrollArea>
               {items.map(({product})=>(
                <CartItem  key={product.id}/>
              ))}
               </ScrollArea>
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1 ">Shipping</span>
                  <span>free</span>
                </div>
                <div className="flex">
                  <span className="flex-1 ">Transaction fee</span>
                  <span>{formatPrice(fee)}</span>
                </div>
                <div className="flex">
                  <span className="flex-1 ">Total</span>
                  <span>{formatPrice(cartTotal +  fee)}</span>
                </div>
              </div>

              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href="/cart"
                    className={buttonVariants({
                      className: "w-full",
                    })}
                  >
                    continue to checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div
              aria-hidden='true'
              className="relative mb-4 h-60 w-60 text-muted-foreground">
                <Image src='/hippo-empty-cart.png'
                      fill
                      alt='a hippo showing a cart'
                         />
              </div>
              <div className="text-xl font-semibold">Your cart is empty</div>
              <SheetTrigger>
                  <Link href='/products' className={
                    buttonVariants({
                      variant:"link",
                      size:"sm",
                      className:"text-sm text-muted-foreground"
                    })
                  }>Add Items to your cart to check out</Link>
              </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
