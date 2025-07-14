import { render, screen } from '@testing-library/react';
import MovieCard from './MovieCard';
import type { Movie } from '../../../../Types/movie.types';
import { MemoryRouter } from 'react-router';

const mockMovie: Movie = {
  id: 1,
  title: 'Inception',
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
};

describe('<MovieCard />', () => {
  it('renders movie image with correct src and alt', () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );

    const img = screen.getByRole('img', { name: /inception/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expect.stringContaining(mockMovie.backdrop_path));
    expect(img).toHaveAttribute('alt', mockMovie.title);
  });

  it('displays the movie title', () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
  });
});
