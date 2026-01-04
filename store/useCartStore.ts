import { create } from "zustand";

type CartItem = {
  id: string;            // unique identifier for the item
  name: string;
  desc: string;
  image: string;
  price: number;         // price based on selection
  selectedOption?: string;
  selectedSize?: string;
  quantity: number;
};

type Store = {
  cart: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const useCartStore = create<Store>((set) => ({
  cart: [],
  
  addItemToCart: (item) =>
    set((state) => {
      // check if item with same name + option + size exists
      const existingIndex = state.cart.findIndex(
        (ci) =>
          ci.name === item.name &&
          ci.selectedOption === item.selectedOption &&
          ci.selectedSize === item.selectedSize
      );

      if (existingIndex !== -1) {
        // item exists, increase quantity
        const updatedCart = [...state.cart];
        updatedCart[existingIndex].quantity += item.quantity;
        return { cart: updatedCart };
      } else {
        // add new item
        return { cart: [...state.cart, item] };
      }
    }),

  removeItemFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),

  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
