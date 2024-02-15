import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

export const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className={cn("mx-auto w-full max-w-screen-xl px-2,4 md:px:2-", className)}>
      {children}
    </div>
  );
};
