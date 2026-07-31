import { useState } from "react";
// Make sure to import CartItem along with CartContextType
import { type CartItem, CartContext } from "../contexts/CartContext";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (newItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.sku === newItem.sku);

      console.log("DEBUG ADD ITEM:", {
        newItem: newItem,
        passedStock: newItem.totalStock,
        typeOfStock: typeof newItem.totalStock,
        passedSku: newItem.sku,
      });

      if (existingItem) {
        if (existingItem.quantity >= newItem.totalStock) {
          return prevCart;
        }

        return prevCart.map((item) =>
          item.sku === newItem.sku
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      if (newItem.totalStock < 1) {
        return prevCart;
      }

      return [...prevCart, { ...newItem, quantity: 1 }];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    //  Now this matches CartContextType perfectly!
    <CartContext.Provider value={{ cart, setCart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
