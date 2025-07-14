import { useNavigate } from 'react-router-dom';
import { TMDB_IMAGE_BASE_URL } from '../../../../../../Api/Constants/apiConstants';
import type { Movie } from '../../../../Types/movie.types';
import './MovieCard.scss';

type Props = {
  movie: Movie;
};

export default function MovieCard({ movie }: Props) {
  const navigate = useNavigate();

  const getImageUrl = (path: string, size: string = 'w780') =>
    `${TMDB_IMAGE_BASE_URL}${size}${path}`;

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="card" onClick={handleClick} role="button" tabIndex={0}>
      <img
        src={getImageUrl(movie.backdrop_path)}
        alt={movie.title}
        className="image"
        loading="lazy"
      />
      <p className="MovieCardTitle">{movie.title}</p>
    </div>
  );
}
