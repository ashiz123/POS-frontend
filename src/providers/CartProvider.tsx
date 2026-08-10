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

  const removeFromCart = (sku: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.sku !== sku));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = (sku: string, newQuantity: number) => {
    setCart((prevCart) => {
      const targetItem = prevCart.find((item) => item.sku === sku);
      if (!targetItem) return prevCart;

      // If quantity reduced to 0 or less, remove item from cart
      if (newQuantity <= 0) {
        return prevCart.filter((item) => item.sku !== sku);
      }

      //cap at total available stock
      const validQuantity = Math.min(newQuantity, targetItem.totalStock);

      return prevCart.map((item) =>
        item.sku === sku ? { ...item, quantity: validQuantity } : item,
      );
    });
  };

  return (
    //  Now this matches CartContextType perfectly!
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
