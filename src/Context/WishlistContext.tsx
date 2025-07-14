import { createContext, useContext, useState, type ReactNode } from 'react';
import { mockWishlist } from '../Mocks/wishlist.mock';

export type WishlistItem = {
  id: number;
  title: string;
};

type WishlistContextType = {
  wishlist: WishlistItem[];
  addToWishlist: (movie: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(mockWishlist);

  const addToWishlist = (movie: WishlistItem) => {
    setWishlist((prev) => [...prev, movie]);
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
