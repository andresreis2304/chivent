import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import EventPage from './pages/EventPage.jsx';
import Cart from './pages/Cart.jsx';
import { useEffect, useState } from 'react';

function App() {
  
  const [events, setEvents] = useState([]);  // ← Create a state to store events
  
  useEffect(() => {
  fetch('http://127.0.0.1:5000/events')
    .then((res) => res.json())     // ← Convert response to JSON
    .then((data) => setEvents(data)) // ← Save data into 'events' state
    .catch((error) => console.error('Error fetching events:', error));
    }, []); // ← Only run once when the page loads
    
  return (
    <Routes>
      <Route path="/" element={<Home events={events} />} />
      <Route path="/event/:id" element={<EventPage events={events} />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;

