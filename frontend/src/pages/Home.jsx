import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';
import { useEffect, useState } from 'react';

function Home({ events }) {
    return (
      <div style={{ width: '100vw', boxSizing: 'border-box', margin: 0 }}>
        <Navbar />
        <div style={{
          width: '100%',
          padding: '2rem',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    );
  }
  
  export default Home;