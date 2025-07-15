import { useParams } from 'react-router-dom';
import './MovieDetails.scss';
import { useMovieDetails } from './Hooks/useMovieDetails';
import MovieExtraInfo from './Components/MovieExtraInfo/MovieExtraInfo';
import MovieMainSection from './Components/MovieMainSection/MovieMainSection';
import MovieDetailsSkeleton from './Components/MovieDetailsSkeleton/MovieDetailsSkeleton';

export default function MovieDetails() {
  const { id, category } = useParams();
  const { movie, loading } = useMovieDetails(id);

  return (
    <>
      {loading && <MovieDetailsSkeleton />}
      {!loading && movie && (
        <main className="movie-details">
          <MovieMainSection movie={movie} category={category} />
          <MovieExtraInfo movie={movie} category={category} />
        </main>
      )}
    </>
  );
}
