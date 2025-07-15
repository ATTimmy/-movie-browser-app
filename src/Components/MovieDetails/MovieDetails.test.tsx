import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { WishlistProvider } from '../../Context/WishlistContext';
import { vi, type Mock } from 'vitest';
import * as hook from './Hooks/useMovieDetails';
import MovieDetails from './MovieDetails';

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
  it('renders skeleton while loading', () => {
    (hook.useMovieDetails as Mock).mockReturnValue({ movie: null, loading: true });
    renderWithProviders();
    expect(document.querySelector('.skeleton-poster')).toBeInTheDocument();
  });

  it('renders nothing if movie is not found', () => {
    (hook.useMovieDetails as Mock).mockReturnValue({ movie: null, loading: false });
    const { container } = renderWithProviders();
    expect(container).toBeEmptyDOMElement();
  });

  it('renders movie details using subcomponents', () => {
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
