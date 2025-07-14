import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { WishlistProvider, useWishlist, type WishlistItem } from './WishlistContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <WishlistProvider>{children}</WishlistProvider>
);

describe('WishlistContext', () => {
  it('returns initial wishlist from mock', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    expect(result.current.wishlist).toEqual([
      { id: 1, title: 'Inception' },
      { id: 2, title: 'Interstellar' },
    ]);
  });

  it('adds an item to the wishlist', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });

    const newMovie: WishlistItem = { id: 3, title: 'Tenet' };

    act(() => {
      result.current.addToWishlist(newMovie);
    });

    expect(result.current.wishlist).toContainEqual(newMovie);
    expect(result.current.wishlist.length).toBe(3);
  });

  it('removes an item from the wishlist', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });

    act(() => {
      result.current.removeFromWishlist(1);
    });

    expect(result.current.wishlist.find((m) => m.id === 1)).toBeUndefined();
    expect(result.current.wishlist.length).toBe(1);
  });

  it('throws an error if used outside provider', () => {
    const { result } = renderHook(() => {
      try {
        return useWishlist();
      } catch (e) {
        return e;
      }
    });

    expect(result.current).toBeInstanceOf(Error);
    expect((result.current as Error).message).toMatch(
      /useWishlist must be used within a WishlistProvider/
    );
  });
});
