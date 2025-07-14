import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const renderWithRouter = (initialRoute: string = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <App />
    </MemoryRouter>
  );
};

describe('<App />', () => {
  it('renders the Header component', () => {
    renderWithRouter();
    expect(screen.getByText(/Movie Browser/i)).toBeInTheDocument();
  });

  it('renders Home at "/" route with carousels', () => {
    renderWithRouter('/');
    expect(screen.getByText(/Trending/i)).toBeInTheDocument();
    expect(screen.getByText(/Top Rated/i)).toBeInTheDocument();
    expect(screen.getByText(/Upcoming/i)).toBeInTheDocument();
  });
  it('renders MovieDetails at "/movie/:id" route', () => {
    renderWithRouter('/movie/123');
    expect(screen.getByText(/movie details/i)).toBeInTheDocument();
    expect(screen.getByText(/movie id: 123/i)).toBeInTheDocument();
  });
});
