import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import MovieCard from './MovieCard';
import { WishlistProvider } from '../../../../../../Context/WishlistContext';
import type { Movie } from '../../../../Types/movie.types';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockMovie: Movie = {
  id: 1,
  title: 'Inception',
  poster_path: '/poster.jpg',
  backdrop_path: 'https://image.tmdb.org/t/p/w342/poster.jpg',
  overview: 'A dream within a dream.',
  release_date: '2010-07-16',
  runtime: 148,
  vote_average: 8.8,
  genres: [{ id: 1, name: 'Sci-Fi' }],
};

describe('<MovieCard />', () => {
  it('renders movie image with correct src and alt', () => {
    render(
      <MemoryRouter>
        <WishlistProvider>
          <MovieCard movie={mockMovie} />
        </WishlistProvider>
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
        <WishlistProvider>
          <MovieCard movie={mockMovie} />
        </WishlistProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
  });

  it('shows regular star icon if movie is not in wishlist', () => {
    render(
      <MemoryRouter>
        <WishlistProvider>
          <MovieCard movie={mockMovie} />
        </WishlistProvider>
      </MemoryRouter>
    );

    const star = screen.getByTitle(/add to wishlist/i);
    expect(star).toBeInTheDocument();
  });

  it('toggles wishlist on star icon click', () => {
    render(
      <MemoryRouter>
        <WishlistProvider>
          <MovieCard movie={mockMovie} />
        </WishlistProvider>
      </MemoryRouter>
    );

    const star = screen.getByTitle(/add to wishlist/i);
    fireEvent.click(star);

    expect(screen.getByTitle(/remove from wishlist/i)).toBeInTheDocument();
  });

  it('navigates to movie details on card click', () => {
    render(
      <MemoryRouter>
        <WishlistProvider>
          <MovieCard movie={mockMovie} />
        </WishlistProvider>
      </MemoryRouter>
    );

    const card = screen.getByRole('button');
    fireEvent.click(card);

    expect(mockNavigate).toHaveBeenCalledWith(`/movie/${mockMovie.id}`);
  });
});
