import './MovieCardSkeleton.scss';

export default function MovieCardSkeleton() {
  return (
    <div className="card skeleton" data-testid="movie-skeleton">
      <div className="imageSkeleton" />
      <div className="titleSkeleton" />
    </div>
  );
}
