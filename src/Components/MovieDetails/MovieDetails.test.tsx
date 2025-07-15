import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MovieDetails from './MovieDetails';
import { WishlistProvider } from '../../Context/WishlistContext';
import { vi, type Mock } from 'vitest';
import * as hook from './Hooks/useMovieDetails';

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

vi.mock('./Hooks/useMovieDetails', async () => {
  const actual = await vi.importActual<typeof hook>('./Hooks/useMovieDetails');
  return {
    ...actual,
    useMovieDetails: vi.fn(),
  };
});

function renderWithProviders(route: string = '/movie/1') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <WishlistProvider>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </WishlistProvider>
    </MemoryRouter>
  );
}

describe('<MovieDetails />', () => {
  it('renders loading state', () => {
    (hook.useMovieDetails as Mock).mockReturnValue({ movie: null, loading: true });
    renderWithProviders();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders fallback if movie is not found', () => {
    (hook.useMovieDetails as Mock).mockReturnValue({ movie: null, loading: false });
    renderWithProviders();
    expect(screen.getByText(/movie not found/i)).toBeInTheDocument();
  });

  it('renders movie details correctly', () => {
    (hook.useMovieDetails as Mock).mockReturnValue({ movie: mockMovie, loading: false });
    renderWithProviders();

    expect(screen.getByRole('heading', { name: /inception/i })).toBeInTheDocument();
    expect(screen.getByAltText(/inception/i)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.overview)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.release_date)).toBeInTheDocument();
    expect(screen.getByText(`${mockMovie.runtime} min`)).toBeInTheDocument();
    expect(screen.getByText(String(mockMovie.vote_average))).toBeInTheDocument();
    expect(screen.getByText(mockMovie.genres[0].name)).toBeInTheDocument();
  });
});
