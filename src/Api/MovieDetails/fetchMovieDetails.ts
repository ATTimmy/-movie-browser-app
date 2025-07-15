import fetchFromTMDB from '../Home/fetchHomeData';

export const fetchMovieDetails = (id: string) => {
  return fetchFromTMDB(`/movie/${id}?language=en-US&append_to_response=credits,videos`);
};
