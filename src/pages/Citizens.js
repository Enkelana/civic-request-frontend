import React, { useState, useEffect } from 'react';
import { getCitizens, createCitizen } from '../services/api';

function Citizens() {
  const [citizens, setCitizens] = useState([]);
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', nationalId: '' });
  const [message, setMessage] = useState('');

  const fetchCitizens = async () => {
    const res = await getCitizens();
    setCitizens(res.data);
  };

  useEffect(() => { fetchCitizens(); }, []);

  const handleSubmit = async () => {
    try {
      await createCitizen(form);
      setMessage('✅ Qytetari u shtua me sukses!');
      setForm({ fullName: '', email: '', phone: '', nationalId: '' });
      fetchCitizens();
    } catch (err) {
      setMessage('❌ Gabim: ' + (err.response?.data || 'Ndodhi një gabim'));
    }
  };

  const inputStyle = {
    padding: '10px', borderRadius: '8px', border: '1px solid #ccc',
    width: '100%', marginBottom: '12px', fontSize: '14px'
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2 style={{ color: '#1F4E79' }}>👥 Qytetarët</h2>

      {/* FORMA */}
      <div style={{ background: '#f0f4f8', borderRadius: '12px', padding: '20px', maxWidth: '450px', marginBottom: '30px' }}>
        <h3 style={{ marginTop: 0 }}>Shto Qytetar të Ri</h3>
        <input style={inputStyle} placeholder="Emri i plotë" value={form.fullName}
          onChange={e => setForm({ ...form, fullName: e.target.value })} />
        <input style={inputStyle} placeholder="Email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} />
        <input style={inputStyle} placeholder="Telefon" value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })} />
        <input style={inputStyle} placeholder="Numri Personal" value={form.nationalId}
          onChange={e => setForm({ ...form, nationalId: e.target.value })} />
        <button onClick={handleSubmit} style={{
          background: '#2E75B6', color: 'white', border: 'none',
          padding: '10px 25px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px'
        }}>Shto</button>
        {message && <p style={{ marginTop: '10px' }}>{message}</p>}
      </div>

      {/* LISTA */}
      <h3>Lista e Qytetarëve ({citizens.length})</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#2E75B6', color: 'white' }}>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>Emri</th>
            <th style={{ padding: '10px' }}>Email</th>
            <th style={{ padding: '10px' }}>Telefon</th>
          </tr>
        </thead>
        <tbody>
          {citizens.map((c, i) => (
            <tr key={c.id} style={{ background: i % 2 === 0 ? '#f9f9f9' : 'white' }}>
              <td style={{ padding: '10px', textAlign: 'center' }}>{c.id}</td>
              <td style={{ padding: '10px' }}>{c.fullName}</td>
              <td style={{ padding: '10px' }}>{c.email}</td>
              <td style={{ padding: '10px' }}>{c.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Citizens;