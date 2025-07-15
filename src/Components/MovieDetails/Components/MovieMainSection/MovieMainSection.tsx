import { TMDB_IMAGE_BASE_URL } from '../../../../Api/Constants/apiConstants';
import type { Movie } from '../../../Home/Types/movie.types';
import AddToWishlistButton from '../AddToWishlistButton/AddToWishlistButton';
import './Styles/MovieMainSection.scss';

type Props = {
  movie: Movie;
  category?: string;
};

export default function MovieMainSection({ movie, category = 'Trending' }: Props) {
  return (
    <div
      className={`movie-details__main movie-details--${category.toLowerCase()}`}
      style={
        {
          '--backdrop-url': `url(${TMDB_IMAGE_BASE_URL}w780${movie.backdrop_path})`,
        } as React.CSSProperties
      }
    >
      <img
        className="movie-details__poster"
        src={`${TMDB_IMAGE_BASE_URL}w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="movie-details__info">
        <h1 className="movie-details__title">{movie.title}</h1>
        <p className="movie-details__overview">{movie.overview}</p>
        <AddToWishlistButton movie={movie} />
      </div>
    </div>
  );
}
