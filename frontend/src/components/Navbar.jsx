import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid gray' }}>
      <div style={{ fontWeight: 'bold', fontSize: '24px' }}>
        Chivent
      </div>
      <div style={{ fontSize: '20px' }}>
        Events in Chicago
      </div>
      <div>
        <Link to="/cart">🛒</Link>
      </div>
    </nav>
  );
}

export default Navbar;
