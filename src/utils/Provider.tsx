// File: /context/Provider.tsx
import { createContext, useContext, useState, useCallback } from "react";
import { AppContextType, CartItem, Product } from "../types/types";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [headerText, setHeaderText] = useState("Product List");

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      return existingItem
        ? prev.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  }, []);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  }, []);

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        headerText,
        setHeaderText,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within a Provider");
  return context;
};
