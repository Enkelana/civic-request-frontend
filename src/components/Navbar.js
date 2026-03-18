import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      background: '#1F4E79', padding: '15px 30px',
      display: 'flex', alignItems: 'center', gap: '30px'
    }}>
      <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
        🏛️ CivicRequest
      </span>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
      <Link to="/citizens" style={{ color: 'white', textDecoration: 'none' }}>Qytetarët</Link>
      <Link to="/requests" style={{ color: 'white', textDecoration: 'none' }}>Kërkesat</Link>
    </nav>
  );
}

export default Navbar;