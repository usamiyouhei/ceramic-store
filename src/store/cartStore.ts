import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (cartItemId: string) => void;
  increaseQuantity: (cartItemId: string) => void;
  decreaseQuantity: (cartItemId: string) => void;
};

export const useCartStore = create<CartState>()(
  persist((set) => ({
    items: [],

    addItem: (newItem) =>
      set((state) => {
        const existingItem = state.items.find(
          (item) => item.cartItemId === newItem.cartItemId,
        );

        if (existingItem) {
          return {
            items: state.items.map((item) =>
              item.cartItemId === newItem.cartItemId
                ? {
                    ...item,
                    quantity: item.quantity + newItem.quantity,
                  }
                : item,
            ),
          };
        }

        return {
          items: [...state.items, newItem],
        };
      }),

    removeItem: (cartItemId) =>
      set((state) => ({
        items: state.items.filter((item) => item.cartItemId !== cartItemId),
      })),

    increaseQuantity: (cartItemId) =>
      set((state) => ({
        items: state.items.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      })),
  })),
);
