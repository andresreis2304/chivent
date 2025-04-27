
import { Link } from 'react-router-dom';



function EventCard({ event }) {
  return (
    <div style={{ display: 'flex', 
    alignItems: 'center', 
    border: '1px solid blue', 
    margin: '1rem 0', 
    padding: '1rem',
    borderRadius: '8px',
    width: '100%',
    boxSizing: 'border-box',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
    backgroundColor: '#FFF'}}>

      <img src={event.image} alt={event.name} style={{ width: '100px', 
        height: '100px', 
        objectFit: 'cover', 
        marginRight: '1rem' }} />
      <div style={{ marginRight: '1rem' }}>
        <strong>{event.date}</strong>
      </div>
      <div style={{ flex: 1 }}>
        <h2>{event.name}</h2>
      </div>
      <div>
        <Link to={`/event/${event.id}`}>
          <button style={{ border: '1px solid red', 
            padding: '0.5rem' }}>More Info</button>
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
