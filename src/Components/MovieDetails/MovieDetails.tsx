import { useParams } from 'react-router-dom';
import './MovieDetails.scss';
import { useMovieDetails } from './Hooks/useMovieDetails';
import MovieExtraInfo from './Components/MovieExtraInfo/MovieExtraInfo';
import MovieMainSection from './Components/MovieMainSection/MovieMainSection';

export default function MovieDetails() {
  const { id, category } = useParams();
  const { movie, loading } = useMovieDetails(id);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found</p>;

  return (
    <main className="movie-details">
      <MovieMainSection movie={movie} category={category} />
      <MovieExtraInfo movie={movie} category={category} />
    </main>
  );
}
