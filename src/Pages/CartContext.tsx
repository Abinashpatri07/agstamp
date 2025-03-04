// import React, { createContext, useContext, useState, ReactNode } from "react";

// // Define cart item type
// interface CartItem {
//   id: number;
//   name: string;
//   image: string;
//   price: number;
//   quantity: number;
// }

// // Define context type
// interface CartContextType {
//   cart: CartItem[];
//   addToCart: (product: CartItem) => void;
//   removeFromCart: (id: number) => void;
//   clearCart: () => void;
//   updateQuantity: (id: number, amount: number) => void;  // <-- FIXED: Added updateQuantity function
// }

// // Create context
// const CartContext = createContext<CartContextType | undefined>(undefined);

// // Custom hook for using the cart context
// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };

// // Cart Provider Component
// export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   // Add to Cart Function
//   const addToCart = (product: CartItem) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.id === product.id);
//       if (existingItem) {
//         return prevCart.map((item) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       }
//       return [...prevCart, { ...product, quantity: 1 }];
//     });
//   };

//   // Remove from Cart
//   const removeFromCart = (id: number) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== id));
//   };

//   // Clear Cart
//   const clearCart = () => {
//     setCart([]);
//   };

//   // Update Quantity Function (Fix for the error)
//   const updateQuantity = (id: number, amount: number) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
//       )
//     );
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
//       {children}
//     </CartContext.Provider>
//   );
// };


import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define cart item type
interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

// Define context type
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  updateQuantity: (id: number, amount: number) => void;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook for using the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Cart Provider Component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load cart from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to Cart Function
  const addToCart = (product: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remove from Cart
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Clear Cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart"); // Also remove from localStorage
  };

  // Update Quantity Function
  const updateQuantity = (id: number, amount: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
