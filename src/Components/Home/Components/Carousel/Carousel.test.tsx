import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Carousel from './Carousel';
import { vi } from 'vitest';
import type { Movie } from '../../Types/movie.types';

const mockMovies: Movie[] = [
  { id: 1, title: 'Movie One', poster_path: '', backdrop_path: '' },
  { id: 2, title: 'Movie Two', poster_path: '', backdrop_path: '' },
];

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
    configurable: true,
    value: vi.fn(),
  });
});

describe('<Carousel />', () => {
  it('renders the carousel title', () => {
    render(<Carousel title="Top Rated" fetchFn={vi.fn()} />);
    expect(screen.getByText(/Top Rated/i)).toBeInTheDocument();
  });

  it('renders movies after loading', async () => {
    const fetchFn = vi.fn().mockResolvedValue({ results: mockMovies });
    render(<Carousel title="Trending" fetchFn={fetchFn} />);

    await waitFor(() => {
      expect(screen.getByText('Movie One')).toBeInTheDocument();
      expect(screen.getByText('Movie Two')).toBeInTheDocument();
    });
  });

  it('handles dot clicks', async () => {
    const fetchFn = vi.fn().mockResolvedValue({ results: mockMovies });
    render(<Carousel title="Dots" fetchFn={fetchFn} />);

    const dots = await screen.findAllByRole('button', { name: /Go to movie/i });

    await act(async () => {
      fireEvent.click(dots[1]);
    });

    expect(HTMLElement.prototype.scrollTo).toHaveBeenCalled();
  });

  it('calls scroll on arrow click', async () => {
    const fetchFn = vi.fn().mockResolvedValue({ results: mockMovies });
    render(<Carousel title="Arrows" fetchFn={fetchFn} />);

    const rightArrow = screen.getByLabelText('Scroll Right');

    await act(async () => {
      fireEvent.click(rightArrow);
    });

    expect(HTMLElement.prototype.scrollTo).toHaveBeenCalled();
  });
});
