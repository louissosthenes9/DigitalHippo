import { cn } from "../lib/utils";
import React, { ReactNode } from "react";

export const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className={cn("mx-auto w-full max-w-screen-xl md:px-20 p-2.5", className)}>
      {children}
    </div>
  );
};
