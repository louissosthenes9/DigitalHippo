import { Product } from "@/payload-types";
import { ImageIcon } from "lucide-react";
import Image from "next/image";

export default function CartItem({product} :Product) {
  const {image} = product.image[0]
  return (
    <div className="flex items-start justify-between gap-4">
       <div className="flex items-center space-x-4">
            <div className="relative aspect-square rounded h-16 w-16 min-w-fit overflow-hidden">
                 {typeof image !== "string" && image.url ? (
                  <Image 
                  src={image.url} 
                  alt={product.name} 
                  fill
                  className="absolute object-cover"
                  
                  />
                 ):(
                    <div className="flex h-full items-center justify-center bg-secondary">
                      <ImageIcon
                       aria-hidden="true" 
                      />

                    </div>
                 )}
            </div>
       </div>
    </div>
  )
}
