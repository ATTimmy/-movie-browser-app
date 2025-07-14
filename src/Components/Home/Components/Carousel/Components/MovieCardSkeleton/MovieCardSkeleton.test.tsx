import { render, screen } from '@testing-library/react';
import MovieCardSkeleton from './MovieCardSkeleton';

describe('<MovieCardSkeleton />', () => {
  it('renders a skeleton card with correct structure', () => {
    render(<MovieCardSkeleton />);

    const skeleton = screen.getByTestId('movie-skeleton');
    expect(skeleton).toBeInTheDocument();

    const image = skeleton.querySelector('.imageSkeleton');
    const title = skeleton.querySelector('.titleSkeleton');

    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
