import { useWishlist } from '../../../../Context/WishlistContext';
import type { Movie } from '../../../Home/Types/movie.types';
import './AddToWishlistButton.scss';

type Props = {
  movie: Movie;
};

export default function AddToWishlistButton({ movie }: Props) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isInWishlist = wishlist.some((item) => item.id === movie.id);

  const handleClick = () => {
    if (isInWishlist) {
      removeFromWishlist(movie.id);
    } else {
      addToWishlist({ id: movie.id, title: movie.title });
    }
  };

  return (
    <button className="wishlist-button" onClick={handleClick}>
      {isInWishlist ? '★ Remove from Wishlist' : '☆ Add to Wishlist'}
    </button>
  );
}
