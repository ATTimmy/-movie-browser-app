import './Home.scss';

import Carousel from './Components/Carousel/Carousel';

import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from '../../Api/Home/fetchHomeData';

export default function Home() {
  return (
    <main className="container">
      <section className="section">
        <Carousel title="Trending" fetchFn={fetchTrendingMovies} />
      </section>

      <section className="section">
        <Carousel title="Top Rated" fetchFn={fetchTopRatedMovies} />
      </section>

      <section className="section">
        <Carousel title="Upcoming" fetchFn={fetchUpcomingMovies} />
      </section>
    </main>
  );
}
