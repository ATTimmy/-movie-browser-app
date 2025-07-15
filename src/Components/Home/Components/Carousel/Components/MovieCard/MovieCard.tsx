import { useNavigate } from 'react-router-dom';
import { TMDB_IMAGE_BASE_URL } from '../../../../../../Api/Constants/apiConstants';
import type { Movie } from '../../../../Types/movie.types';
import './MovieCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useWishlist } from '../../../../../../Context/WishlistContext';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { toggleWishlistHandler } from '../../../../../../Context/Utils/toggleWishlist';

type Props = {
  movie: Movie;
};

export default function MovieCard({ movie }: Props) {
  const navigate = useNavigate();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isInWishlist = wishlist.some((item) => item.id === movie.id);

  const getImageUrl = (path: string, size: string = 'w342') =>
    `${TMDB_IMAGE_BASE_URL}${size}${path}`;

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    toggleWishlistHandler(
      e,
      { id: movie.id, title: movie.title },
      isInWishlist,
      addToWishlist,
      removeFromWishlist
    );
  };

  return (
    <div className="card" onClick={handleClick} role="button" tabIndex={0}>
      <img
        src={getImageUrl(movie.poster_path)}
        alt={movie.title}
        className="image"
        loading="lazy"
      />
      <div className="card-footer">
        <p className="MovieCardTitle">{movie.title}</p>
        <FontAwesomeIcon
          icon={isInWishlist ? solidStar : regularStar}
          className={`wishlist-icon ${isInWishlist ? 'active' : ''}`}
          onClick={toggleWishlist}
          title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        />
      </div>
    </div>
  );
}
