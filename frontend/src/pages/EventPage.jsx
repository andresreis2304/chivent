import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

function EventPage({ events }) {
    const { id } = useParams();
  
    if (!events || events.length === 0) {
      return (
        <div style={{ width: '100vw', boxSizing: 'border-box', margin: 0 }}>
          <Navbar />
          <div style={{
            width: '100%',
            padding: '2rem',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <h1>Loading event details...</h1>
          </div>
        </div>
      );
    }
  
    const event = events.find((e) => e.id === id);
  
    if (!event) {
      return (
        <div style={{ width: '100vw', boxSizing: 'border-box', margin: 0 }}>
          <Navbar />
          <div style={{
            width: '100%',
            padding: '2rem',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <h1>Event Not Found</h1>
            <p>Sorry, this event does not exist.</p>
          </div>
        </div>
      );
    }
  
    return (
      <div style={{ width: '100vw', boxSizing: 'border-box', margin: 0 }}>
        <Navbar />
        <div style={{
          width: '100%',
          padding: '2rem',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <h1>{event.name}</h1>
          <img src={event.image} alt={event.name} style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Info:</strong> {event.info}</p>
        </div>
      </div>
    );
}
  
  export default EventPage;