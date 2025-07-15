import './MovieExtraInfo.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faStar, faFilm } from '@fortawesome/free-solid-svg-icons';
import type { Movie } from '../../../Home/Types/movie.types';

type Props = {
  movie: Movie;
  category?: string;
};

export default function MovieExtraInfo({ movie, category = 'Trending' }: Props) {
  const categoryClass = `movie-details--${category.toLowerCase()}`;

  return (
    <div className={`movie-details__extra ${categoryClass}`}>
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
  );
}
