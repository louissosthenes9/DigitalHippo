import Image from "next/image";
import type SwiperType from "swiper"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"
import {Pagination} from "swiper/modules"
import "swiper/css/pagination"
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
interface ImageSliderProps {
  urls: string[]; // Use string type for image URLs
}

export default function ImageSlider({ urls }: ImageSliderProps) {
   
   
    const [activeIndex, setActiveIndex] = useState(0)   
    const [swiper,setSwiper] = useState<null | SwiperType>(null)
    const activeStyles =
    "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 rounded-full border-2 text-white bg-white border-zinc-300";
    const inactiveStyles = "hidden text-gray-400";
   
    //track the current slide
    const [slideConfig, setSlideConfig] = useState({
      isBeginning:true,
      isEnd:activeIndex === (urls.length??0)-1
    })


    //keep track of positions

    useEffect(()=>{
         swiper?.on("slideChange",({activeIndex})=>{
            setActiveIndex(activeIndex)
            setSlideConfig(
             { 
              isBeginning:activeIndex===0,
              isEnd:activeIndex === (urls.length??0)-1
            }
            )
         })
    },[swiper,urls])
  return (
    <div className="group relative bg-zinc-100 aspect-square overflow-hidden rounded-xl">
      <div className="absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition">
        <button
        aria-label="next image"
        onClick={(e)=>{
          e.preventDefault()

          swiper?.slideNext()
        }}
        
        className={cn(activeStyles,"right-3 transition",{
          [inactiveStyles]:slideConfig.isEnd,
          "hover:bg-primary-300 text-primary-800 opacity-100": !slideConfig.isEnd 
        })}><ChevronRight  className="h-4 w-4 text-zinc-700 "/>{ ' '} 
        </button>

        {/* the left button */}
        <button
        aria-label="previous image"
        onClick={(e)=>{
          e.preventDefault()

          swiper?.slidePrev()
        }}
        
        className={cn(activeStyles,"left-3 transition",{
          [inactiveStyles]:slideConfig.isBeginning,
          "hover:bg-primary-300 text-primary-800 opacity-100": !slideConfig.isBeginning 
        })}><ChevronLeft className="h-4 w-4 text-zinc-700 "/>{ ' '} 
        </button>
    
    
       </div>

      <Swiper
       pagination ={
        {
          renderBullet: (_,className)=>{
            return `<span class = "rounded-full transition  ${className}"></span>`
          }
        }
       }
       modules={[Pagination]}
       spaceBetween={50}
       slidesPerView={1}
       className="w-full h-full" 
       onSwiper={(swiper)=>{setSwiper(swiper)}}>
      
        {urls.map((url, i) => (
          <SwiperSlide key={i} className="-z-10 relative h-full w-full">
            <Image
              fill // Use fill for responsive sizing
              className="z-10 h-full object-cover object-center"
              loading={'eager'}
              src={url}
              alt="Product image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
 