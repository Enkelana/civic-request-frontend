import React, { useState, useEffect } from 'react';
import { getCitizens, createCitizen } from '../services/api';
import Pagination from '../components/Pagination';
import { useTheme } from '../context/ThemeContext';
import { validateEmail, validatePhone, validateNationalId, validateFullName } from '../utils/validators';

function Citizens() {
  const { darkMode } = useTheme();
  const [citizens, setCitizens] = useState([]);
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', nationalId: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchCitizens = async () => {
    const res = await getCitizens();
    setCitizens(res.data);
  };

  useEffect(() => { fetchCitizens(); }, []);

  const totalPages = Math.ceil(citizens.length / itemsPerPage);
  const paginatedCitizens = citizens.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const validate = () => {
    const newErrors = {
      fullName: validateFullName(form.fullName),
      email: validateEmail(form.email),
      phone: validatePhone(form.phone),
      nationalId: validateNationalId(form.nationalId),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(e => e !== '');
  };

  const handleSubmit = async () => {
    setMessage('');
    if (!validate()) return;

    try {
      await createCitizen(form);
      setMessage('✅ Qytetari u shtua me sukses!');
      setForm({ fullName: '', email: '', phone: '', nationalId: '' });
      setErrors({});
      setCurrentPage(1);
      fetchCitizens();
    } catch (err) {
      setMessage('❌ Gabim: ' + (err.response?.data || 'Ndodhi një gabim'));
    }
  };

  const bg = darkMode ? '#16213e' : '#f5f7fa';
  const cardBg = darkMode ? '#1a1a2e' : '#f0f4f8';
  const textColor = darkMode ? '#BDD7EE' : '#1F4E79';

  const inputStyle = (field) => ({
    padding: '10px', borderRadius: '8px',
    border: `1px solid ${errors[field] ? 'red' : '#ccc'}`,
    width: '100%', marginBottom: '4px', fontSize: '14px',
    boxSizing: 'border-box',
    background: darkMode ? '#16213e' : 'white',
    color: darkMode ? 'white' : '#333'
  });

  return (
    <div style={{ padding: '30px', background: bg, minHeight: '100vh' }}>
      <h2 style={{ color: textColor }}>👥 Qytetarët</h2>

      {/* FORMA */}
      <div style={{ background: cardBg, borderRadius: '12px', padding: '20px', maxWidth: '450px', marginBottom: '30px' }}>
        <h3 style={{ marginTop: 0, color: textColor }}>Shto Qytetar të Ri</h3>

        <input style={inputStyle('fullName')} placeholder="Emri i plotë" value={form.fullName}
          onChange={e => setForm({ ...form, fullName: e.target.value })} />
        {errors.fullName && <p style={{ color: 'red', fontSize: '12px', marginBottom: '8px' }}>{errors.fullName}</p>}

        <input style={inputStyle('email')} placeholder="Email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} />
        {errors.email && <p style={{ color: 'red', fontSize: '12px', marginBottom: '8px' }}>{errors.email}</p>}

        <input style={inputStyle('phone')} placeholder="Telefon (10 shifra)" value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })} />
        {errors.phone && <p style={{ color: 'red', fontSize: '12px', marginBottom: '8px' }}>{errors.phone}</p>}

        <input style={inputStyle('nationalId')} placeholder="Numri Personal" value={form.nationalId}
          onChange={e => setForm({ ...form, nationalId: e.target.value })} />
        {errors.nationalId && <p style={{ color: 'red', fontSize: '12px', marginBottom: '8px' }}>{errors.nationalId}</p>}

        <button onClick={handleSubmit} style={{
          background: '#2E75B6', color: 'white', border: 'none',
          padding: '10px 25px', borderRadius: '8px', cursor: 'pointer',
          fontSize: '15px', marginTop: '8px'
        }}>Shto</button>
        {message && <p style={{ marginTop: '10px' }}>{message}</p>}
      </div>

      {/* LISTA */}
      <h3 style={{ color: textColor }}>Lista e Qytetarëve ({citizens.length})</h3>
      {citizens.length === 0 ? (
        <p style={{ color: '#888', fontStyle: 'italic' }}>⚠️ Nuk ka qytetarë të regjistruar.</p>
      ) : (
        <>
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
              {paginatedCitizens.map((c, i) => (
                <tr key={c.id} style={{ background: i % 2 === 0 ? (darkMode ? '#1a1a2e' : '#f9f9f9') : (darkMode ? '#16213e' : 'white') }}>
                  <td style={{ padding: '10px', textAlign: 'center', color: darkMode ? 'white' : '#333' }}>{c.id}</td>
                  <td style={{ padding: '10px', color: darkMode ? 'white' : '#333' }}>{c.fullName}</td>
                  <td style={{ padding: '10px', color: darkMode ? 'white' : '#333' }}>{c.email}</td>
                  <td style={{ padding: '10px', color: darkMode ? 'white' : '#333' }}>{c.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
}

export default Citizens;