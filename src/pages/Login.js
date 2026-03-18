import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5280/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('fullName', res.data.fullName);
      navigate('/');
    } catch (err) {
      setError('Email ose fjalëkalim i gabuar!');
    }
  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'center',
      alignItems: 'center', height: '100vh', background: '#f0f4f8'
    }}>
      <div style={{
        background: 'white', borderRadius: '16px',
        padding: '40px', width: '360px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
      }}>
        <h2 style={{ color: '#1F4E79', textAlign: 'center', marginBottom: '30px' }}>
          🏛️ CivicRequest
        </h2>
        <input
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', width: '100%', marginBottom: '12px', fontSize: '14px', boxSizing: 'border-box' }}
          placeholder="Email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', width: '100%', marginBottom: '20px', fontSize: '14px', boxSizing: 'border-box' }}
          placeholder="Fjalëkalimi" type="password" value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
        <button onClick={handleLogin} style={{
          background: '#1F4E79', color: 'white', border: 'none',
          padding: '12px', width: '100%', borderRadius: '8px',
          cursor: 'pointer', fontSize: '16px'
        }}>Hyr</button>
      </div>
    </div>
  );
}

export default Login;