import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home component', () => {
  it('renders welcome message', () => {
    render(<Home />);
    expect(screen.getByText('Welcome to Movie Browser App!')).toBeInTheDocument();
  });
});
