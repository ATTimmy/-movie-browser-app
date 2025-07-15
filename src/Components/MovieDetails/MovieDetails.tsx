import { useParams } from 'react-router-dom';
import './MovieDetails.scss';
import { TMDB_IMAGE_BASE_URL } from '../../Api/Constants/apiConstants';
import { useMovieDetails } from './Hooks/useMovieDetails';
import AddToWishlistButton from './Components/AddToWishlistButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faStar, faFilm } from '@fortawesome/free-solid-svg-icons';

export default function MovieDetails() {
  const { id } = useParams();
  const { movie, loading } = useMovieDetails(id);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found</p>;

  return (
    <main className="movie-details">
      <div
        className="movie-details__main"
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

      <div className="movie-details__extra">
        <span>
          <FontAwesomeIcon icon={faCalendar} /> {movie.release_date}
        </span>
        <span>
          <FontAwesomeIcon icon={faClock} /> {movie.runtime} min
        </span>
        <span>
          <FontAwesomeIcon icon={faStar} /> {movie.vote_average}
        </span>
        <span>
          <FontAwesomeIcon icon={faFilm} /> {movie.genres.map((g) => g.name).join(', ')}
        </span>
      </div>
    </main>
  );
}
