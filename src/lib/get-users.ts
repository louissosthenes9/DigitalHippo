import {getServerSideUser} from "@/lib/payload-utils";
import {cookies} from "next/headers";
export async function getServerSideProps(context:any) {
    const nextCookies = cookies()
    const user = await getServerSideUser(nextCookies);
    return {
      props: { user }, // will be passed to the page component as props
    }
  }