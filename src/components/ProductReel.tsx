"use client";
import { TQueryValidator } from '@/lib/validators/query-validator';
import { trpc } from '../trpc/client';
import Link from 'next/link';
import React from 'react';
import { Product } from '@/payload-types';
import ProductListing from './ProductListing';

interface ProductReelProps {
    title: string;
    subtitle?: string;
    href?: string;
    query: TQueryValidator;
}

export default function ProductReel(props: ProductReelProps) {
    const { title, subtitle, href, query } = props;
    const FALLBACK_LIMIT = 4;

    const { data: queryResults, isLoading } = trpc.getinfiniteProducts.useInfiniteQuery({
        limit: query.limit ?? FALLBACK_LIMIT,
        query,
    }, {
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });

    const products = queryResults?.pages.flatMap((page) => page.items);

    let map: (Product | null)[] = [];

    if (products && products.length) {
         map = products 
    } else if (isLoading) {
        map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
    }

    return (
        <section className='md:flex md:items-center md:justify-between mb-4'>
            <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
                {title ? <h1 className='sm:text-3xl text-2xl font-bold text-gray-900'>{title}</h1> : null}
                {subtitle ? <p className='mt-2 text-sm text-muted-foreground'>{subtitle}</p> : null}
            </div>

            {href ? (
                <Link href={href} className='text-sm font-medium text-blue-600 hover:text-blue-200'>
                    Shop the Collection{' '}
                    <span aria-hidden="true">&rarr;</span>
                </Link>
            ) : null}

            <div className="relative mt-6 md:mt-0 w-full">
                <div className="flex items-center w-full">
                    <div className="w-full grid grid-cols-2 lg:gap-x-10 md:gap-y-10 md:grid-cols-4 sm:gap-x-6 gap-x-4 gap-y-10">
                        {/* Render products here */}
                    
                    

                        {map.map((product,i)=>(
                          <ProductListing  key={i} product={product} index={i}/>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
