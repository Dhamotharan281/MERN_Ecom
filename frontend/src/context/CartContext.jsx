import React, { createContext, useState, useContext, useEffect } from "react";
import API from "../api/axios";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      const localCart = localStorage.getItem("cart");
      if (localCart) {
        setCart(JSON.parse(localCart));
      }
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      const { data } = await API.get("/cart");
      setCart(data.data);
    } catch (error) {
      console.error("Fetch cart error:", error);
    }
  };

  const addToCart = async (product, quantity = 1, size, color) => {
    try {
      setLoading(true);
      
      if (isAuthenticated) {
        const { data } = await API.post("/cart", {
          productId: product._id,
          quantity,
          size,
          color,
        });
        setCart(data.data);
        toast.success("Added to cart!");
      } else {
        const existingItem = cart.items.find(
          (item) =>
            item.product._id === product._id &&
            item.size === size &&
            item.color === color
        );

        let updatedCart;
        if (existingItem) {
          updatedCart = {
            ...cart,
            items: cart.items.map((item) =>
              item.product._id === product._id && item.size === size && item.color === color
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          };
        } else {
          updatedCart = {
            ...cart,
            items: [
              ...cart.items,
              {
                product,
                quantity,
                size,
                color,
                price: product.discountPrice || product.price,
              },
            ],
          };
        }

        updatedCart.totalPrice = updatedCart.items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        toast.success("Added to cart!");
      }
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      if (isAuthenticated) {
        const { data } = await API.delete(`/cart/${itemId}`);
        setCart(data.data);
      } else {
        const updatedCart = {
          ...cart,
          items: cart.items.filter((item) => item._id !== itemId),
        };
        updatedCart.totalPrice = updatedCart.items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
      toast.success("Removed from cart");
    } catch (error) {
      toast.error("Failed to remove from cart");
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      if (isAuthenticated) {
        const { data } = await API.put("/cart", { itemId, quantity });
        setCart(data.data);
      } else {
        const updatedCart = {
          ...cart,
          items: cart.items.map((item) =>
            item._id === itemId ? { ...item, quantity } : item
          ),
        };
        updatedCart.totalPrice = updatedCart.items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  const clearCart = async () => {
    try {
      if (isAuthenticated) {
        await API.delete("/cart");
      }
      setCart({ items: [], totalPrice: 0 });
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Clear cart error:", error);
    }
  };

  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount: cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
