import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
