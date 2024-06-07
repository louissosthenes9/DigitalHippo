import Image from "next/image";
import type SwiperType from "swiper"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"
import "swiper/css/pagination"
import { useState } from "react";
interface ImageSliderProps {
  urls: string[]; // Use string type for image URLs
}

export default function ImageSlider({ urls }: ImageSliderProps) {
   
 
    const [activeIndex, setActiveIndex] = useState(0)   
    const [swiper,setSwiper] = useState<null | SwiperType>(null)
    const activeStyles =
    "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 rounded-full border-2 text-white bg-white border-zinc-300";
    const inactiveStyles = "hidden text-gray-400";

  return (
    <div className="group relative bg-zinc-100 aspect-square overflow-hidden rounded-xl">
      <div className="absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition">
        <button></button>
      </div>

      <Swiper className="w-full h-full">
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
