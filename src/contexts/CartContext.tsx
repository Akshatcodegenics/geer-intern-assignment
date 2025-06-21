
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  wishlistItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        toast({
          title: "Updated Cart!",
          description: `${product.name} quantity increased.`,
        });
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast({
          title: "Added to Cart!",
          description: `${product.name} has been added to your cart.`,
        });
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    toast({
      title: "Removed from Cart",
      description: "Item has been removed from your cart.",
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const addToWishlist = (product: Product) => {
    setWishlistItems(prev => {
      if (prev.find(item => item.id === product.id)) {
        toast({
          title: "Already in Wishlist",
          description: `${product.name} is already in your wishlist.`,
        });
        return prev;
      }
      toast({
        title: "Added to Wishlist!",
        description: `${product.name} has been added to your wishlist.`,
      });
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist.",
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value: CartContextType = {
    cartItems,
    wishlistItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getTotalPrice,
    getTotalItems,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
