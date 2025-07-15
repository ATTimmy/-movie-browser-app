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

  it('renders wishlist count', () => {
    renderWithContext();
    expect(screen.getByText(/wishlist \(0\)/i)).toBeInTheDocument();
  });

  it('shows wishlist popover on button click', () => {
    renderWithContext();

    const button = screen.getByRole('button', { name: /wishlist/i });
    fireEvent.click(button);

    expect(screen.getByText(/your wishlist is empty/i)).toBeInTheDocument();
  });

  it('hides wishlist popover on outside click', () => {
    renderWithContext();

    const button = screen.getByRole('button', { name: /wishlist/i });
    fireEvent.click(button);

    expect(screen.getByText(/your wishlist is empty/i)).toBeInTheDocument();

    fireEvent.mouseDown(document.body);

    expect(screen.queryByText(/your wishlist is empty/i)).not.toBeInTheDocument();
  });
});
