import { describe, it, expect, vi } from 'vitest';
import type { WishlistItem } from '../WishlistContext';
import { toggleWishlistHandler } from './toggleWishlist';

describe('toggleWishlistHandler', () => {
  const mockItem: WishlistItem = { id: 1, title: 'Inception' };

  it('calls removeFromWishlist when item is in wishlist', () => {
    const addToWishlist = vi.fn();
    const removeFromWishlist = vi.fn();
    const mockEvent = { stopPropagation: vi.fn() } as unknown as React.MouseEvent;

    toggleWishlistHandler(mockEvent, mockItem, true, addToWishlist, removeFromWishlist);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(removeFromWishlist).toHaveBeenCalledWith(mockItem.id);
    expect(addToWishlist).not.toHaveBeenCalled();
  });

  it('calls addToWishlist when item is not in wishlist', () => {
    const addToWishlist = vi.fn();
    const removeFromWishlist = vi.fn();
    const mockEvent = { stopPropagation: vi.fn() } as unknown as React.MouseEvent;

    toggleWishlistHandler(mockEvent, mockItem, false, addToWishlist, removeFromWishlist);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(addToWishlist).toHaveBeenCalledWith(mockItem);
    expect(removeFromWishlist).not.toHaveBeenCalled();
  });
});
