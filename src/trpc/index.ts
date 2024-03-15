import { publicProcedure, router } from "./trpc";

export const appRouter = router({
    anyApiroute:publicProcedure.query(()=>{
        return "hellow world"
    }
    ),
})

export type Approuter = typeof appRouter  