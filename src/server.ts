import express from "express";
import { getPayloadClient } from "./get-payload";
import { Nexthandler, nextApp } from "./next-utils";

const app = express()
const PORT = Number(process.env.PORT) || 3000
const start =  async ()=>{
    const payload = await getPayloadClient({
        initOptions:{
           express:app,
           onInit: async (cms)=>{
            cms.logger.info(`Admin URL ${cms.getAdminURL()}`)
           }
        }
    })

    app.use((req,res)=>Nexthandler(req,res))
    nextApp.prepare().then(()=>{
     // payload.logger.info("Nextjs started")
      app.listen(PORT, async () => {
        // payload.logger.info(`Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`)
      })
    })
}

start()