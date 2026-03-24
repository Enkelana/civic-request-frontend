import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function Navbar() {
  const navigate = useNavigate();
  const fullName = localStorage.getItem('fullName') || 'Zyrtar';
  const { darkMode, toggleDarkMode } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
    navigate('/login');
  };

  return (
    <nav style={{
      background: darkMode ? '#1a1a2e' : '#1F4E79',
      padding: '15px 30px',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
          🏛️ CivicRequest
        </span>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
        <Link to="/citizens" style={{ color: 'white', textDecoration: 'none' }}>Qytetarët</Link>
        <Link to="/requests" style={{ color: 'white', textDecoration: 'none' }}>Kërkesat</Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <Link to="/profile" style={{ color: '#BDD7EE', fontSize: '14px', textDecoration: 'none' }}>
  👤 {fullName}
</Link>
        <button onClick={toggleDarkMode} style={{
          background: darkMode ? '#f0c040' : '#34495e',
          color: darkMode ? '#1a1a2e' : 'white',
          border: 'none', padding: '8px 16px',
          borderRadius: '8px', cursor: 'pointer', fontSize: '14px'
        }}>
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
        <button onClick={handleLogout} style={{
          background: '#C0392B', color: 'white', border: 'none',
          padding: '8px 16px', borderRadius: '8px', cursor: 'pointer',
          fontSize: '14px', fontWeight: 'bold'
        }}>
          🚪 Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;