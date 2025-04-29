import { Link } from 'react-router-dom';

function Navbar({ cartCount }) {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        
        backgroundColor: '#86af49',   // medium green 
        color: 'white',               

        padding: '1rem',
        borderBottom: '5px solid black',   // keep the black border
      }}
    >
      <div style={{ fontWeight: 'bold', fontSize: '24px' }}>
        Chivent
      </div>
      <div style={{ fontSize: '20px' }}>
        Events in Chicago
      </div>
      <div>
        <Link to="/cart">🛒</Link>
        <span style={{ marginLeft: '0.5rem' }}>
          Cart&nbsp;Items:&nbsp;{cartCount}
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
