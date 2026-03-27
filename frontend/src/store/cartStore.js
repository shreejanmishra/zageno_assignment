import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item._id === product._id
          );

          if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            const cappedQuantity =
              product.stock != null
                ? Math.min(newQuantity, product.stock)
                : newQuantity;

            if (cappedQuantity === existingItem.quantity) return state;

            return {
              items: state.items.map((item) =>
                item._id === product._id
                  ? { ...item, quantity: cappedQuantity }
                  : item
              ),
            };
          }

          const cappedQuantity =
            product.stock != null
              ? Math.min(quantity, product.stock)
              : quantity;

          return {
            items: [
              ...state.items,
              {
                _id: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: cappedQuantity,
              },
            ],
          };
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item._id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return;
        set((state) => ({
          items: state.items.map((item) =>
            item._id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getCartTotal: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getCartCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);

export default useCartStore;
