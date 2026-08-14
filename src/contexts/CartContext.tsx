import { createContext } from "react";

export interface CartItem {
  _id: string;
  productId: string;
  batchId: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  totalStock: number;
  imageUrl: string | undefined;
}

export interface CartContextType {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  clearCart: () => void;
  updateQuantity: (sku: string, quantity: number) => void;
  removeFromCart: (sku: string) => void;
}

export const CartContext = createContext<CartContextType | null>(null);
