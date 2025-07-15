import type { WishlistItem } from '../WishlistContext';

export function toggleWishlistHandler(
  e: React.MouseEvent,
  item: WishlistItem,
  isInWishlist: boolean,
  addToWishlist: (item: WishlistItem) => void,
  removeFromWishlist: (id: number) => void
): void {
  e.stopPropagation();

  if (isInWishlist) {
    removeFromWishlist(item.id);
  } else {
    addToWishlist(item);
  }
}
