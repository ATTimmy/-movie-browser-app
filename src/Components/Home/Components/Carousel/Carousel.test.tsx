import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Carousel from './Carousel';
import { vi } from 'vitest';
import type { Movie } from '../../Types/movie.types';
import { MemoryRouter } from 'react-router';
import { WishlistProvider } from '../../../../Context/WishlistContext';

const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Movie One',
    poster_path: '/poster1.jpg',
    backdrop_path: '/backdrop1.jpg',
    overview: '',
    release_date: '',
    runtime: 0,
    vote_average: 0,
    genres: [],
  },
  {
    id: 2,
    title: 'Movie Two',
    poster_path: '/poster2.jpg',
    backdrop_path: '/backdrop2.jpg',
    overview: '',
    release_date: '',
    runtime: 0,
    vote_average: 0,
    genres: [],
  },
];

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
    configurable: true,
    value: vi.fn(),
  });
});

const renderWithProviders = (ui: React.ReactNode) =>
  render(
    <MemoryRouter>
      <WishlistProvider>{ui}</WishlistProvider>
    </MemoryRouter>
  );

describe('<Carousel />', () => {
  it('renders the carousel title', () => {
    renderWithProviders(<Carousel title="Top Rated" fetchFn={vi.fn()} />);
    expect(screen.getByText(/Top Rated/i)).toBeInTheDocument();
  });

  it('renders movies after loading', async () => {
    const fetchFn = vi.fn().mockResolvedValue({ results: mockMovies });
    renderWithProviders(<Carousel title="Trending" fetchFn={fetchFn} />);

    await waitFor(() => {
      expect(screen.getByText('Movie One')).toBeInTheDocument();
      expect(screen.getByText('Movie Two')).toBeInTheDocument();
    });
  });

  it('handles dot clicks', async () => {
    const fetchFn = vi.fn().mockResolvedValue({ results: mockMovies });
    renderWithProviders(<Carousel title="Dots" fetchFn={fetchFn} />);

    const dots = await screen.findAllByRole('button', { name: /Go to movie/i });

    await act(async () => {
      fireEvent.click(dots[1]);
    });

    expect(HTMLElement.prototype.scrollTo).toHaveBeenCalled();
  });

  it('calls scroll on arrow click', async () => {
    const fetchFn = vi.fn().mockResolvedValue({ results: mockMovies });
    renderWithProviders(<Carousel title="Arrows" fetchFn={fetchFn} />);

    const rightArrow = screen.getByLabelText('Scroll Right');

    await act(async () => {
      fireEvent.click(rightArrow);
    });

    expect(HTMLElement.prototype.scrollTo).toHaveBeenCalled();
  });
});
