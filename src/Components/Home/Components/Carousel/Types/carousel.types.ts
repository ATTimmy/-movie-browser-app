import type { Movie } from '../../../Types/movie.types';

export type CarouselProps = {
  title: string;
  fetchFn: () => Promise<{ results: Movie[] }>;
};
