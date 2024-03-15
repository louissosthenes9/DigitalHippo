import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from '@/lib/validators/account-credentials-validator'
import { trpc } from '@/trpc/client'
import { toast } from 'sonner'
import { ZodError } from 'zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  })
  const onSubmit = ({
    email,
    password,
  }: TAuthCredentialsValidator) => {
  }

  const { data }  = trpc.anyApiroute.useQuery()
  return (
    <>
      <div className="container relative flex flex-col items-center justify-center lg:px-0 pt-20">
        {/*logo and heading of the signup page */}
        <div className="mx-auto flex w-full flex-col justify-center items-center space-y-6 sm:w-[350px]">
          <div className="text-center flex flex-col space-y-2 justify-center">
            <Icons.logo className="h-20 w-20 mx-auto" />
            <h1 className="text-2xl font-bold">create an account</h1>
            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
              href="/sign-in"
            >
              Already have an account? sign-in
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        
        {/* sign up form */}
        <div className="grid gap-6">
          <form>
            <div className="grid gap-2">
              <div className="grid gap-1 py-2"></div>
              <Label htmlFor="Password">Password</Label>
              <Input
                className={cn({
                  "focus-visible-ring-red-500": true,
                })}
                placeholder="you@email.com"
              />

              <Label htmlFor="emai">Emai</Label>
              <Input
                className={cn({
                  "focus-visible-ring-red-500": true,
                })}
                placeholder="password"
              />
              <Button >sign up</Button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
