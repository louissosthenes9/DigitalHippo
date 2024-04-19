
import { PRODUCT_CATEGORIES } from "../../config";
import { CollectionConfig } from "payload/types";

export const Products : CollectionConfig ={
    slug: "products",
    admin:{
        useAsTitle:"name"
    },
    access:{},
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