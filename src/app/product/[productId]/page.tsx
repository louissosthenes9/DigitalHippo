import { ProductFiles } from "@/collections/ProductFile";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { getPayloadClient } from "@/get-payload";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: {
        productId: string;
    };
}

const BREADCRUMBS = [
    { id: 1, name: "Home", href: '/' },
    { id: 2, name: "Products", href: '/products' }
];

interface Product {
    id: string;
    name: string;
    approvedForSale: string;
    // Add any other fields that your product object contains
}

export default async function page({ params }: PageProps) {
    const { productId } = params;
    const payload = await getPayloadClient();

    const response = await payload.find({
        collection: "products",
        limit: 1,
        where: {
            id: {
                equals: productId
            },
            approvedForSale: {
                equals: "approved",
            }
        }
    });

    const products = response.docs as unknown as Product[];
    const [product] = products;

    if (!product) return notFound();

    return (
        <MaxWidthWrapper>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:max-w-lg lg:self-end">
                        <ol className="flex items-center space-x-2">
                            {
                                BREADCRUMBS.map((breadcrumb, i) => (
                                    <li key={breadcrumb.href}>
                                        <div className="flex items-center text-sm">
                                            <Link
                                                href={breadcrumb.href}
                                                className="font-medium text-sm text-muted-foreground hover:text-gray-900 "
                                            >
                                                {breadcrumb.name}
                                            </Link>
                                            {i !== BREADCRUMBS.length - 1 ? (<CheckIcon />) : null}
                                        </div>
                                    </li>
                                ))
                            }
                        </ol>

                        <div className="mt-4">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                {product.name}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </MaxWidthWrapper>
    );
}
