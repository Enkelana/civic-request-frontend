import React, { useState, useEffect } from 'react';
import { getProfile, changePassword } from '../services/api';
import { useTheme } from '../context/ThemeContext';

function Profile() {
  const { darkMode } = useTheme();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleChangePassword = async () => {
    setError('');
    setMessage('');

    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      setError('Ju lutem plotësoni të gjitha fushat!');
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError('Fjalëkalimet e reja nuk përputhen!');
      return;
    }

    if (form.newPassword.length < 6) {
      setError('Fjalëkalimi i ri duhet të ketë të paktën 6 karaktere!');
      return;
    }

    try {
      await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword
      });
      setMessage('✅ Fjalëkalimi u ndryshua me sukses!');
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError('❌ ' + (err.response?.data || 'Fjalëkalimi aktual është i gabuar!'));
    }
  };

  const bg = darkMode ? '#16213e' : '#f5f7fa';
  const cardBg = darkMode ? '#1a1a2e' : 'white';
  const textColor = darkMode ? '#BDD7EE' : '#1F4E79';

  const inputStyle = {
    padding: '10px', borderRadius: '8px',
    border: '1px solid #ccc', width: '100%',
    marginBottom: '12px', fontSize: '14px',
    boxSizing: 'border-box',
    background: darkMode ? '#16213e' : 'white',
    color: darkMode ? 'white' : '#333'
  };

  return (
    <div style={{ padding: '30px', background: bg, minHeight: '100vh' }}>
      <h2 style={{ color: textColor }}>👤 Profili Im</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>

        {/* INFO */}
        <div style={{ background: cardBg, borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h3 style={{ color: textColor, marginTop: 0 }}>📋 Të Dhënat e Llogarisë</h3>
          {profile ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {[
                  ['Emri i plotë', profile.fullName],
                  ['Email', profile.email],
                  ['Roli', profile.role],
                  ['Regjistruar më', new Date(profile.createdAt).toLocaleDateString('sq-AL')],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td style={{ padding: '12px 10px', color: '#888', fontWeight: 'bold', fontSize: '14px', borderBottom: '1px solid #eee' }}>{label}:</td>
                    <td style={{ padding: '12px 10px', color: darkMode ? 'white' : '#333', fontSize: '14px', borderBottom: '1px solid #eee' }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: '#888' }}>Duke ngarkuar...</p>
          )}
        </div>

        {/* NDRYSHO FJALËKALIMIN */}
        <div style={{ background: cardBg, borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h3 style={{ color: textColor, marginTop: 0 }}>🔑 Ndrysho Fjalëkalimin</h3>

          <input style={inputStyle} placeholder="Fjalëkalimi aktual"
            type="password" value={form.currentPassword}
            onChange={e => setForm({ ...form, currentPassword: e.target.value })} />

          <input style={inputStyle} placeholder="Fjalëkalimi i ri"
            type="password" value={form.newPassword}
            onChange={e => setForm({ ...form, newPassword: e.target.value })} />

          <input style={inputStyle} placeholder="Konfirmo fjalëkalimin e ri"
            type="password" value={form.confirmPassword}
            onChange={e => setForm({ ...form, confirmPassword: e.target.value })} />

          {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
          {message && <p style={{ color: 'green', fontSize: '14px' }}>{message}</p>}

          <button onClick={handleChangePassword} style={{
            background: '#1F4E79', color: 'white', border: 'none',
            padding: '10px 25px', borderRadius: '8px',
            cursor: 'pointer', fontSize: '15px', width: '100%'
          }}>Ndrysho Fjalëkalimin</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;