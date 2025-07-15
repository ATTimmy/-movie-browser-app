import { render, screen } from '@testing-library/react';
import MovieExtraInfo from './MovieExtraInfo';
import type { Movie } from '../../../Home/Types/movie.types';

const mockMovie: Movie = {
  id: 1,
  title: 'Inception',
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  overview: 'A mind-bending thriller',
  release_date: '2010-07-16',
  runtime: 148,
  vote_average: 8.8,
  genres: [
    { id: 1, name: 'Sci-Fi' },
    { id: 2, name: 'Action' },
  ],
};

describe('<MovieExtraInfo />', () => {
  it('renders release date', () => {
    render(<MovieExtraInfo movie={mockMovie} category="default" />);
    expect(screen.getByText(mockMovie.release_date)).toBeInTheDocument();
  });

  it('renders runtime in minutes', () => {
    render(<MovieExtraInfo movie={mockMovie} category="default" />);
    expect(screen.getByText(`${mockMovie.runtime} min`)).toBeInTheDocument();
  });

  it('renders vote average', () => {
    render(<MovieExtraInfo movie={mockMovie} category="default" />);
    expect(screen.getByText(String(mockMovie.vote_average))).toBeInTheDocument();
  });

  it('renders all genre names', () => {
    render(<MovieExtraInfo movie={mockMovie} category="default" />);
    expect(screen.getByText(/Sci-Fi, Action/i)).toBeInTheDocument();
  });
});
