import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { WishlistProvider } from '../../../../Context/WishlistContext';
import MovieMainSection from './MovieMainSection';

const mockMovie = {
  id: 1,
  title: 'Inception',
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  overview: 'A mind-bending thriller',
  release_date: '2010-07-16',
  runtime: 148,
  vote_average: 8.8,
  genres: [{ id: 1, name: 'Sci-Fi' }],
};

function renderWithProviders() {
  return render(
    <MemoryRouter>
      <WishlistProvider>
        <MovieMainSection movie={mockMovie} />
      </WishlistProvider>
    </MemoryRouter>
  );
}

describe('<MovieMainSection />', () => {
  it('renders poster image with correct src and alt', () => {
    renderWithProviders();
    const img = screen.getByAltText(/inception/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expect.stringContaining(mockMovie.poster_path));
  });

  it('displays movie title and overview', () => {
    renderWithProviders();
    expect(screen.getByRole('heading', { name: /inception/i })).toBeInTheDocument();
    expect(screen.getByText(mockMovie.overview)).toBeInTheDocument();
  });

  it('renders the AddToWishlistButton', () => {
    renderWithProviders();
    expect(screen.getByRole('button', { name: /add to wishlist/i })).toBeInTheDocument();
  });
});
