import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import EventPage from './pages/EventPage.jsx';
import Cart from './pages/Cart.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/event/:id" element={<EventPage />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;

