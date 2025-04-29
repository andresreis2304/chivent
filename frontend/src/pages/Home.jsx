import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';

function Home({ events, cart, setCart }) {
    const totalItems = cart.reduce((sum, e) => sum + e.quantity, 0);
  return (
    <div style={{ width: '100vw', boxSizing: 'border-box', margin: 0 }}>
      {/* ✅ send cart length */}
      <Navbar cartCount={totalItems} />

      <div
        style={{
          width: '100%',
          padding: '2rem',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {events.map((e) => (
          <EventCard
            key={e.id}
            event={e}
            cart={cart}
            setCart={setCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;