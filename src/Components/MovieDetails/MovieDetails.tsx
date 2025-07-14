import { useParams } from 'react-router-dom';

export default function MovieDetails() {
  const { id } = useParams();

  return (
    <main className="movie-details">
      <h1>Movie Details</h1>
      <p>Movie ID: {id}</p>
    </main>
  );
}
