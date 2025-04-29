import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import EventPage from './pages/EventPage.jsx';
import Cart from './pages/Cart.jsx';
import Navbar from './components/Navbar.jsx';
import { useEffect, useState } from 'react';

function App() {
  
  const [events, setEvents] = useState([]);  // State of events to display
  const [cart, setCart] = useState([]); // State of items in cart
  
  useEffect(() => {
  fetch('http://3.133.100.165/events/all')
    .then((res) => res.json())     // response to JSON
    .then((data) => setEvents(data)) // Save data into events state
    .catch((error) => console.error('Error fetching events:', error));
    }, []); // Only run once when the page loads
    
  return (
    
    <Routes>
      <Route path="/" element={<Home events={events} cart={cart} setCart={setCart} />} />
      <Route path="/event/:id" element={<EventPage events={events} cart={cart} setCart={setCart} />} />
      <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
    </Routes>
  );
}

export default App;

