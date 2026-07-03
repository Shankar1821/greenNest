import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('greennest_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('greennest_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (plant) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === plant.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === plant.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevItems, { ...plant, qty: 1 }];
    });
  };

  const removeFromCart = (plantId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== plantId));
  };

  const updateQty = (plantId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(plantId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === plantId ? { ...item, qty: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const cartSavings = cartItems.reduce(
    (acc, item) => acc + (item.originalPrice - item.price) * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartCount,
        cartTotal,
        cartSavings,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
