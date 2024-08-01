import { z } from "zod";
import { privateProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { getPayloadClient } from "@/get-payload";
import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";

interface Product {
  id: string;
  name: string;
  price: number;
  priceId: string;
  // Add other properties as needed
}

export const paymentRouter = router({
  createSession: privateProcedure
    .input(
      z.object({
        productIds: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not logged in.",
        });
      }

      const { productIds } = input;
      if (productIds.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No product IDs provided.",
        });
      }

      const payload = await getPayloadClient();

      // Fetch products
      const { docs } = await payload.find({
        collection: "products",
        where: {
          id: { in: productIds },
        },
      });

      // Cast the returned docs to Product[] after ensuring proper types
      const products: Product[] = docs.map((doc) => {
        // Safely cast properties to the expected types
        const id = String(doc.id); // Ensure id is a string
        const name = doc.name as string;
        const price = doc.price as number;
        const priceId = doc.priceId as string;

        return { id, name, price, priceId };
      });

      if (products.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No products found for the provided IDs.",
        });
      }

      // Filter products with a valid priceId
      const filteredProducts = products.filter((prod) => Boolean(prod.priceId));

      if (filteredProducts.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No products with valid price IDs found.",
        });
      }

      const order = await payload.create({
        collection: "orders",
        data: {
          _isPaid: false,
          products: filteredProducts.map((product) => product.id),
          user: user.id,
        },
      });

      const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
        filteredProducts.map((product) => ({
          price: product.priceId,
          quantity: 1,
          adjustable_quantity: {
            enabled: false,
          },
        }));

      try {
        const stripeSession = await stripe.checkout.sessions.create({
          success_url: `${process.env.NEXT_PUBLIC_URL}/thank-you?orderId=${order.id}`,
          cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
          payment_method_types: ["card"],
          mode: "payment",
          metadata: {
            userId: user.id,
            orderId: order.id,
          },
          line_items,
        });


        return {url:stripeSession.url}

        return { sessionId: stripeSession.id };
      } catch (error) {
        console.log(error)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create a Stripe session.",
        });
      }
    }),
});
