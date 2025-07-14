import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import { WishlistProvider } from './Context/WishlistContext';

export default function App() {
  return (
    <WishlistProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </WishlistProvider>
  );
}
