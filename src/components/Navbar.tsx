"use client"
import React from 'react'
import { MaxWidthWrapper } from './MaxWidthWrapper'
import Link from 'next/link'
import { Icons } from './Icons'
import NavItems from './NavItems'
export default function () {
  return (
    <nav className='bg-white sticky z-50 top-0 inset-x-0 h-16'>
            <header className='bg-white relative'>
                <MaxWidthWrapper>
                    <div className='border-b border-gray-200'>
                        <div className='flex h-16 items-center'>
                            {/* mobile navbar */}
                            <div className="ml:4 lg:ml:0 flex">
                                <Link href="/"><Icons.logo className ="w-10  h-10"/></Link>
                            </div>
                            <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
                               <NavItems />
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </header>
    </nav>
  )
}
