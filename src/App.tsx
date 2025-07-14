import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import { WishlistProvider } from './Context/WishlistContext';
import MovieDetails from './Components/MovieDetails/MovieDetails';

export default function App() {
  return (
    <WishlistProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </WishlistProvider>
  );
}
