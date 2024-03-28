"use client";
import { trpc } from "@/trpc/client";
import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface verifyEmailProps {
  token: string;
}
export default function VerifyEmail({ token }: verifyEmailProps) {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (isError) {
    return(    <div className="flex flex-col items-center gap-2">
      <XCircle className="w-8 h-8 text-red-800" />
      <h3 className="font-semibold text-xl">Ooops! There was a problem</h3>
      <p className="text-foreground-muted">
        This token has expired. Please try again later
      </p>
    </div>)
  }
  if (data?.success) {
    return (
    <div className="flex flex-col h-full justify-center items-center">
         <div className="relative mb-4 h-60 w-60 text-muted-foreground">
             <Image 
               src='/hippo-email-sent.png'
               fill
               alt="email sent image"
             />
         </div>
         <h3>Thank you</h3>
         <Link href='/sign-in' className={buttonVariants({className:'mb-4'})}> sign in </Link>
    </div>);

  
  }
  if (isLoading) {
    return(
     <div className="flex flex-col items-center gap-2">
        <Loader2  className="w-8 h-8 text-red-800" />
        <h3 className="font-semibold text-xl">Verifying...</h3>
        <p className="text-foreground-muted">
          This wont take long
        </p>
      </div>  
    )
}
}
