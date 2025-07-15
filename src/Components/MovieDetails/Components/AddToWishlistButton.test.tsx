import { render, screen, fireEvent } from '@testing-library/react';
import AddToWishlistButton from './AddToWishlistButton';
import { WishlistProvider } from '../../../Context/WishlistContext';
import type { Movie } from '../../Home/Types/movie.types';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockMovie: Movie = {
  id: 1,
  title: 'Inception',
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  overview: 'Dreams within dreams.',
  release_date: '2010-07-16',
  runtime: 148,
  vote_average: 8.8,
  genres: [{ id: 1, name: 'Sci-Fi' }],
};

const renderWithProvider = (component: React.ReactElement) => {
  return render(<WishlistProvider>{component}</WishlistProvider>);
};

describe('<AddToWishlistButton />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the "Add to Wishlist" button if movie is not in wishlist', () => {
    renderWithProvider(<AddToWishlistButton movie={mockMovie} />);
    expect(screen.getByRole('button', { name: /add to wishlist/i })).toBeInTheDocument();
  });

  it('adds movie to wishlist when clicked', () => {
    renderWithProvider(<AddToWishlistButton movie={mockMovie} />);

    const button = screen.getByRole('button', { name: /add to wishlist/i });
    fireEvent.click(button);

    expect(screen.getByRole('button', { name: /remove from wishlist/i })).toBeInTheDocument();
  });

  it('removes movie from wishlist when clicked again', () => {
    renderWithProvider(<AddToWishlistButton movie={mockMovie} />);

    fireEvent.click(screen.getByRole('button', { name: /add to wishlist/i }));

    fireEvent.click(screen.getByRole('button', { name: /remove from wishlist/i }));

    expect(screen.getByRole('button', { name: /add to wishlist/i })).toBeInTheDocument();
  });
});
