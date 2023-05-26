import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  const removeFromCart = () => {
    if (cartCount > 0) {
      setCartCount(cartCount - 1);
    }
  };

  const handleBuyNow = () => {
    alert("Pembelian Berhasil!");
    setCartCount(0);
  }

  const cartData = {
    cartCount,
    addToCart,
    removeFromCart,
    handleBuyNow,
  };

  return (
    <CartContext.Provider value={cartData}>{children}</CartContext.Provider>
  );
};
