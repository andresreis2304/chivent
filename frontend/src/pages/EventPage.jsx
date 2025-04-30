import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

function EventPage({events, cart, setCart }) {
  const { id }   = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  /* ----- try local first, else fetch ----- */
  useEffect(() => {
    const local = events.find(e => e.id === id);

    if (local) {
      setEvent(local);
      setLoading(false);
      return;
    }

    /* fallback: ask backend for just this event */
    fetch(`${import.meta.env.VITE_API_BASE}/event/${id}`)
      .then(r => {
        if (!r.ok) throw new Error('404');
        return r.json();
      })
      .then(data => setEvent(data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id, events]);

  /* ----- UI states ----- */
  if (loading) {
    return (
      <div style={{ width: '100vw' }}>
        <Navbar cartCount={cart.reduce((s, e) => s + e.quantity, 0)} />
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Loading event details…</h1>
        </div>
      </div>
    );
  }

  if (notFound || !event) {
    return (
      <div style={{ width: '100vw' }}>
        <Navbar cartCount={cart.reduce((s, e) => s + e.quantity, 0)} />
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Event Not Found</h1>
        </div>
      </div>
    );
  }

  /* ----- success ----- */
  const addToCart = () => {
    const existing = cart.find(e => e.id === event.id);
    if (existing) {
      setCart(
        cart.map(e =>
          e.id === event.id ? { ...e, quantity: e.quantity + 1 } : e
        )
      );
    } else {
      setCart([...cart, { ...event, quantity: 1 }]);
    }
  };

  return (
    <div style={{ width: '100vw' }}>
      <Navbar cartCount={cart.reduce((s, e) => s + e.quantity, 0)} />

      <div style={{
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <h1>{event.name}</h1>

        <img
          src={event.image}
          alt={event.name}
          style={{ width: 300, height: 300, objectFit: 'cover' }}
        />

        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Start:</strong> {event.start_time}</p>
        <p><strong>End:</strong> {event.end_time}</p>
        <p><strong>Venue:</strong> {event.place}</p>
        {event.price_min !== null && (
        <p style={{ marginTop: '0.5rem', fontSize: '1rem', color: 'gray' }}>
        Min Price ${event.price_min.toFixed(2)}
        Max Price ${event.price_max.toFixed(2)}
        </p>
        )}
        <p style={{ maxWidth: 600 }}><strong>Info:</strong> {event.info}</p>

        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export default EventPage;