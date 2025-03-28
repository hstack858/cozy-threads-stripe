import { createContext, useContext, useState, ReactNode } from "react";

type CartItem = {
  id: string;
  name: string;
  amount: number;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  totalAmount: () => number;
  getCartSize: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    const cartItemToFind = cart.find((i) => i.id === item.id);
    if (cartItemToFind) {
      setCart((prevCart) =>
        prevCart.map((i) =>
          i.id === item.id
            ? {
                id: i.id,
                name: i.name,
                amount: i.amount,
                quantity: i.quantity + 1,
              }
            : i
        )
      );
    } else {
      setCart((prevCart) => [
        ...prevCart,
        {
          id: item.id,
          name: item.name,
          amount: item.amount,
          quantity: 1,
        },
      ]);
    }
  };

  const removeFromCart = (itemId: string) => {
    const cartItemToFind = cart.find((i) => i.id === itemId);
    if (cartItemToFind && cartItemToFind.quantity > 1) {
      setCart((prevCart) =>
        prevCart.map((i) =>
          i.id === itemId
            ? {
                id: i.id,
                name: i.name,
                amount: i.amount,
                quantity: i.quantity - 1,
              }
            : i
        )
      );
    } else {
      setCart((prevCart) => prevCart.filter((i) => i.id !== itemId));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalAmount = () => {
    return (
      Math.round(
        cart.reduce(
          (accumulator, cartItem) =>
            accumulator + cartItem.amount * cartItem.quantity,
          0
        ) * 100
      ) / 100
    );
  };

  const getCartSize = () => {
    return cart.reduce(
      (accumulator, cartItem) => accumulator + cartItem.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalAmount,
        getCartSize,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
