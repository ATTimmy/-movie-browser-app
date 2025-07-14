import { render, screen } from '@testing-library/react';
import MovieCard from './MovieCard';
import type { Movie } from '../../../../Types/movie.types';

const mockMovie: Movie = {
  id: 1,
  title: 'Inception',
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
};

describe('<MovieCard />', () => {
  it('renders movie image with correct src and alt', () => {
    render(<MovieCard movie={mockMovie} />);

    const img = screen.getByRole('img', { name: /inception/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expect.stringContaining(mockMovie.backdrop_path));
    expect(img).toHaveAttribute('alt', mockMovie.title);
  });

  it('displays the movie title', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
  });
});
