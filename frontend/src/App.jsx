import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import EventPage from './pages/EventPage.jsx';
import Cart from './pages/Cart.jsx';
import { useEffect, useState } from 'react';

function App() {
  const [events, setEvents] = useState([]);
  const [cart,   setCart]   = useState([]);

  const API_BASE = import.meta.env.VITE_API_BASE ?? '';   // "" in dev .env

  useEffect(() => {
    fetch('https://988d-3-133-100-165.ngrok-free.app/events/all')            
      .then(res  => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Error fetching events:', err));
  }, []);                                     

  return (
    <Routes>
      <Route path="/"           element={<Home      events={events} cart={cart} setCart={setCart} />} />
      <Route path="/event/:id"  element={<EventPage events={events} cart={cart} setCart={setCart} />} />
      <Route path="/cart"       element={<Cart      cart={cart}   setCart={setCart} />} />
    </Routes>
  );
}

export default App;