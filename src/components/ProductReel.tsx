import Link from 'next/link'
import React from 'react'
interface ProductReelProps{
    title:string
    subtitle?:string
    href?:string
}
export default function ProductReel(props : ProductReelProps) {
    const {title,subtitle,href} = props
  
    return (
    <section className='md:flex md:items-center md:justify-between mb-4'>
     <div className="mx-w-2xl px-4 lg:max-w-4xl lg:px-0">
         {title 
         ?<h1 className='sm:text-3xl text-2xl font-bold text-gray-900 '>{title}</h1>
        :null 
        }
         {subtitle 
         ?<p className='mt-2 text-sm text-muted-foreground'>{subtitle}</p>
        :null 
        }

        {
         href
         ?<Link href={href} className='hidden text-sm font-medium text-blue-600 hover:text-blue-200'>Shop the Collection{''}
         <span aria-hidden="true">&arr;</span>
         </Link>
         :null
        }
     </div>
    </section>
  )
}
