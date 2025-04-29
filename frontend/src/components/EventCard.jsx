
import { Link } from 'react-router-dom';

function EventCard({ event, cart, setCart }) {
    const addToCart = () => {
        const existingEvent = cart.find(e => e.id === event.id);
      
        if (existingEvent) {
          // If event already in cart then ++
          const updatedCart = cart.map(e => 
            e.id === event.id ? { ...e, quantity: e.quantity + 1 } : e
          );
          setCart(updatedCart);
        } else {
          // If event not in cart, then add it
          setCart([...cart, { ...event, quantity: 1 }]);
        }
    };
  return (
    <div style={{ display: 'flex', 
    alignItems: 'center', 
    border: '4px solid #86af49', // medium green
    margin: '1rem 0', 
    padding: '1rem',
    borderRadius: '10px',
    width: '100%',
    boxSizing: 'border-box',
    boxShadow: '0 5px 5px rgba(0, 0, 0, 0.05)',
    backgroundColor: '#FFF',}}>

      <img src={event.image} alt={event.name} style={{ width: '100px', 
        height: '100px', 
        objectFit: 'cover', 
        marginRight: '1rem' }} />
      <div style={{ marginRight: '1rem' }}>
        <strong>{event.date}</strong>
      </div>
      <div style={{ flex: 1 }}>
        <h2>{event.name}</h2>
        {event.price_min !== null && (
        <p style={{ marginTop: '0.5rem', fontSize: '1rem', color: 'gray' }}>
        Tickets from ${event.price_min.toFixed(2)}
        </p>
        )}
      </div>
      
      <div>
        <Link to={`/event/${event.id}`}>
          <button style={{ border: '1px solid red', 
            padding: '0.5rem' }}>More Info</button>
        </Link>
        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export default EventCard;
