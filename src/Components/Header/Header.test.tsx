import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { WishlistProvider } from '../../Context/WishlistContext';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
const renderWithContext = () =>
  render(
    <MemoryRouter>
      <WishlistProvider>
        <Header />
      </WishlistProvider>
    </MemoryRouter>
  );

describe('Header component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the logo', () => {
    renderWithContext();
    expect(screen.getByText(/movie browser/i)).toBeInTheDocument();
  });

  it('renders wishlist count', () => {
    renderWithContext();
    expect(screen.getByText(/wishlist \(2\)/i)).toBeInTheDocument();
  });

  it('shows wishlist popover on button click', () => {
    renderWithContext();

    const button = screen.getByRole('button', { name: /wishlist/i });
    fireEvent.click(button);

    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('Interstellar')).toBeInTheDocument();
  });

  it('hides wishlist popover on outside click', () => {
    renderWithContext();

    const button = screen.getByRole('button', { name: /wishlist/i });
    fireEvent.click(button);

    expect(screen.getByText('Inception')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);

    expect(screen.queryByText('Inception')).not.toBeInTheDocument();
  });
});
