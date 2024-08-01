
import { BeforeChangeHook } from "payload/dist/globals/config/types";
import { PRODUCT_CATEGORIES } from "../../config";
import { CollectionConfig } from "payload/types";
import { Product } from "../../payload-types";
import { ArrowRightSquare } from "lucide-react";
import { stripe } from "../../lib/stripe";
const addUser:BeforeChangeHook<Product> = async ({req,data})=>{
    const user = req.user

    return {...data,user:user.id}
}
export const Products : CollectionConfig ={
    slug: "products",
    admin:{
        useAsTitle:"name"
    },
    access:{},
    hooks:{
        beforeChange:[
             addUser, async (args) =>{
                if(args.operation === "create"){
                    const data = args.data as Product
                    const createdProduct = await stripe.products.create({
                        name:data.name,
                        default_price_data:{
                            currency:'USD',
                            unit_amount:Math.round(data.price * 100)
                        }
                    })

                    const updated:Product ={
                        ...data,
                        stripeId:createdProduct.id,
                        priceId:createdProduct.default_price as string
                      }

                      return updated
                }else if(args.operation ==="update"){
                    
                    const data = args.data as Product
                    const updatedProduct = await stripe.products.update(data.stripeId!,{
                        name:data.name,
                        default_price:data.priceId!
                    })

                    const updated:Product ={
                        ...data,
                        stripeId:updatedProduct.id,
                        priceId:updatedProduct.default_price as string
                      }

                      return updated
                }
             }
        ]
    },
    fields:[
        {
            name:"user",
            type:"relationship",
            relationTo:"users",
            required:true,
            hasMany:false,
            admin:{
                condition:()=>false
            }
        },
        {
            name:"name",
            label:"Name",
            type:"text",
            required:true
        },
        {
            name:"Description",
            type:"textarea",
            label:"Product Details ",
            required:true
        },
        {
            name:"Price",    
            type:"number",
            label:"Price in Tzs",
            required:true,
            min:0,
            max:50000
        },
        {
            name:"category",
            label:"Category",
            type:"select",
            options:PRODUCT_CATEGORIES.map(
                ({label,value})=>({label,value})
                ),
            required:true,
        },
        {
            name:"product_files",
            label:"Product_file(s)",
            type:"relationship",
            required:true,
            relationTo:"product_files",
            hasMany:false,
        },
        
        {
            name:"approvedForSale",
            label:"Product Status",
            type:"select",
            defaultValue:"pending",
            access:{
                create:({req})=> req.user.role === "admin",
                read:({req})=> req.user.role === "admin",
                update:({req})=> req.user.role === "admin",
            },
            options:[
                {
                    label:"Pending verification",
                    value:"pending"
                },
                {
                    label:"Approved",
                    value:"approved"
                },
                {
                    label:"Denied",
                    value:"denied"
                },
            ]
        },
        {
            name:"priceId",
            type:'text',
            access:{
                create:()=>false ,
                update:()=>false ,
                read:()=>false ,
            },
            admin:{
                hidden:true,
              } 
        },
       
        {
            name:"stripeId",
            type:'text',
            access:{
                create:()=>false ,
                update:()=>false ,
                read:()=>false ,
            },
            admin:{
                hidden:true,
              } 
        },
        {
            name:"images",
            type:"array",
            label:"Product_image",
            minRows:1,
            maxRows:4,
            required:true,
            labels:{
                singular:"Image",
                plural:"Images"
            },
            fields:[
                {
                    name:"image",
                    type:"upload",
                    relationTo:"media",
                    required:true,
                }
            ]
        }
       
         
    ]
}