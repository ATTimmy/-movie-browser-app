import { render } from '@testing-library/react';
import MovieDetailsSkeleton from './MovieDetailsSkeleton';

describe('<MovieDetailsSkeleton />', () => {
  it('renders all skeleton elements', () => {
    const { container } = render(<MovieDetailsSkeleton />);

    expect(container.querySelector('.skeleton-poster')).toBeInTheDocument();
    expect(container.querySelector('.skeleton-info')).toBeInTheDocument();
    expect(container.querySelector('.skeleton-title')).toBeInTheDocument();
    expect(container.querySelectorAll('.skeleton-text').length).toBeGreaterThan(0);
    expect(container.querySelector('.skeleton-button')).toBeInTheDocument();
  });
});
