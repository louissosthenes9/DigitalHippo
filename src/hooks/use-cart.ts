import { Product } from "@/payload-types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Define the CartItem type for individual items in the cart
export type CartItem = {
    product: Product;
};

// Define the CartState type for the Zustand store
type CartState = {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    clearCart: () => void;
};

// Create the Zustand store with persistence
export const useCart = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            addItem: (product) => set((state) => ({
                items: [...state.items, { product }]
            })),
            removeItem: (productId) => set((state) => ({
                items: state.items.filter((item) => item.product.id !== productId)
            })),
            clearCart: () => set({ items: [] })
        }), {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
