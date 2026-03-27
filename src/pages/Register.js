import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError('');

    if (!form.fullName || !form.email || !form.password) {
      setError('Ju lutem plotësoni të gjitha fushat!');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Fjalëkalimet nuk përputhen!');
      return;
    }

    if (form.password.length < 6) {
      setError('Fjalëkalimi duhet të ketë të paktën 6 karaktere!');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        fullName: form.fullName,
        email: form.email,
        password: form.password
      });
      setSuccess('✅ Zyrtari u regjistrua me sukses! Po ridrejtoheni...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError('❌ ' + (err.response?.data || 'Ndodhi një gabim!'));
    }
  };

  const inputStyle = {
    padding: '10px', borderRadius: '8px', border: '1px solid #ccc',
    width: '100%', marginBottom: '12px', fontSize: '14px', boxSizing: 'border-box'
  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'center',
      alignItems: 'center', minHeight: '100vh', background: '#f0f4f8'
    }}>
      <div style={{
        background: 'white', borderRadius: '16px',
        padding: '40px', width: '400px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
      }}>
        <h2 style={{ color: '#1F4E79', textAlign: 'center', marginBottom: '10px' }}>
          🏛️ CivicRequest
        </h2>
        <h3 style={{ color: '#2E75B6', textAlign: 'center', marginBottom: '25px', fontWeight: 'normal' }}>
          Regjistrim Zyrtar i Ri
        </h3>

        <input style={inputStyle} placeholder="Emri i plotë"
          value={form.fullName}
          onChange={e => setForm({ ...form, fullName: e.target.value })} />

        <input style={inputStyle} placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} />

        <input style={inputStyle} placeholder="Fjalëkalimi (min. 6 karaktere)"
          type="password" value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })} />

        <input style={inputStyle} placeholder="Konfirmo Fjalëkalimin"
          type="password" value={form.confirmPassword}
          onChange={e => setForm({ ...form, confirmPassword: e.target.value })} />

        {error && <p style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{error}</p>}
        {success && <p style={{ color: 'green', marginBottom: '10px', fontSize: '14px' }}>{success}</p>}

        <button onClick={handleRegister} style={{
          background: '#1F4E79', color: 'white', border: 'none',
          padding: '12px', width: '100%', borderRadius: '8px',
          cursor: 'pointer', fontSize: '16px', marginBottom: '15px'
        }}>Regjistrohu</button>

        <p style={{ textAlign: 'center', fontSize: '14px', color: '#666' }}>
          Ke llogari? <Link to="/login" style={{ color: '#2E75B6' }}>Hyr këtu</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;