import './MovieDetailsSkeleton.scss';

export default function MovieDetailsSkeleton() {
  return (
    <div className="movie-details__main skeleton">
      <div className="skeleton-poster" />
      <div className="skeleton-info">
        <div className="skeleton-title" />
        <div className="skeleton-text" />
        <div className="skeleton-text short" />
        <div className="skeleton-button" />
      </div>
    </div>
  );
}
