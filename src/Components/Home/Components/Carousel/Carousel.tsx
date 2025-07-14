import { useRef, useState } from 'react';
import './Carousel.scss';

import MovieCard from './Components/MovieCard/MovieCard';
import MovieCardSkeleton from './Components/MovieCardSkeleton/MovieCardSkeleton';
import { useCarouselMovies } from './Hooks/useCarouselMovies';
import { handleScroll, scrollToIndex } from './Utils/scrollHelpers';
import type { CarouselProps } from './Types/carousel.types';

export default function Carousel({ title, fetchFn }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const { movies, loading } = useCarouselMovies(fetchFn);

  const scroll = (direction: 'left' | 'right') => {
    handleScroll(direction, trackRef.current, activeIndex, movies.length, setActiveIndex);
  };

  return (
    <section className="carousel">
      <h2 className="carouselTitle">{title}</h2>

      <div className="controls">
        <button onClick={() => scroll('left')} aria-label="Scroll Left">
          ◀
        </button>
        <button onClick={() => scroll('right')} aria-label="Scroll Right">
          ▶
        </button>
      </div>
      {loading && (
        <div className="track" ref={trackRef}>
          {Array.from({ length: 10 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      )}
      {!loading && (
        <>
          <div className="track" ref={trackRef}>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <div className="dots">
            {movies.map((_, index) => (
              <button
                key={index}
                className={index === activeIndex ? 'dotActive' : 'dot'}
                onClick={() => scrollToIndex(trackRef.current, index, setActiveIndex)}
                aria-label={`Go to movie ${index + 1}`}
              >
                •
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
