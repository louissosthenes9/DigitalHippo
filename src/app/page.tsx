import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import ProductReel from "@/components/ProductReel";

export default function Home() {
  const perks = [
    {
      name: "Fast delivery",
      Icon: ArrowDownToLine,
      Description:
        "Get your assetss on your emails in seconds and download right away",
    },
    {
      name: "Guaranteed Quality",
      Icon: CheckCircle,
      Description: "Renowned user  ratings",
    },
    {
      name: "For the planet",
      Icon: Leaf,
      Description: "We plant a tree for every asset you buy",
    },
  ];
  return (
    <>
      <MaxWidthWrapper>
        <div className="flex flex-col items-center text-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your market place for high quality {""}
            <span className="text-blue-600">digital assets </span>.
          </h1>
          <p className="text-muted-foreground mt-6 text-lg max-w-prose">
            Welcome to digital hippo where all of our assets have been approved
            by our team to ensure high quality.
          </p>
          <div className="flex flex-col gap-4 mt-6 sm:flex-row">
            <Link href="/products" className={buttonVariants()}>
              Trending products
            </Link>
            <Button variant={"ghost"}>Our quality promise &rarr;</Button>
          </div>
        </div>
      </MaxWidthWrapper>
        <ProductReel 
        title="Brand new" 
        href="/products"
        query={{sort:'desc',limit:4}}
        />
      <section className="border-t border-gray-200 bg-border-50">
        <MaxWidthWrapper className="20">
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-6 gap-y-12 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                key={perk.name}
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900 ">
                    <perk.Icon className="w-1/3 h-1/3" />
                  </div>
                </div>
                <div className="mt-6 md:ml-4 lg:ml-0  lg:mt-8">
                     <h3 className="text-base font-medium text-gray-900">{perk.name}</h3>
                     <p className="mt-3 text-muted-foreground text-sm">{perk.Description}</p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
