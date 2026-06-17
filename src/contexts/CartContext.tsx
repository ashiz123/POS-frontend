import { createContext } from "react";

export interface CartItem {
  _id: string;
  batchId: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  totalStock: number;
}

export interface CartContextType {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  clearCart: () => void;
  //   updateQuantity: (sku: string, batchId: string, amount: number) => void;
  //   removeFromCart: (sku: string, batchId: string) => void;
  //   clearCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);
