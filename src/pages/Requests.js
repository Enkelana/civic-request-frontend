import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getRequests, getCategories, getCitizens, createRequest, updateRequestStatus, deleteRequest } from '../services/api';

const statusLabels = { 0: 'Në Pritje', 1: 'Në Process', 2: 'Zgjidhur', 3: 'Refuzuar' };
const statusColors = { 0: '#FFC000', 1: '#ED7D31', 2: '#70AD47', 3: '#FF0000' };

function Requests() {
  const [requests, setRequests] = useState([]);
  const [categories, setCategories] = useState([]);
  const [citizens, setCitizens] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', citizenId: '', categoryId: '' });
  const [message, setMessage] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const fetchAll = async () => {
    const [reqRes, catRes, citRes] = await Promise.all([
      getRequests(), getCategories(), getCitizens()
    ]);
    setRequests(reqRes.data);
    setCategories(catRes.data);
    setCitizens(citRes.data);
  };

  useEffect(() => { fetchAll(); }, []);

  const handleSearch = async () => {
    try {
      setIsSearching(true);
      let url = 'http://localhost:5280/api/requests/search?';
      if (searchTitle.trim()) url += `title=${encodeURIComponent(searchTitle.trim())}&`;
      if (filterStatus) url += `status=${filterStatus}&`;
      if (filterCategory) url += `categoryId=${filterCategory}&`;

      const token = localStorage.getItem('token');
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      setRequests([]);
    }
  };

  const handleReset = async () => {
    setSearchTitle('');
    setFilterStatus('');
    setFilterCategory('');
    setIsSearching(false);
    const res = await getRequests();
    setRequests(res.data);
  };

  const handleSubmit = async () => {
    try {
      await createRequest({
        ...form,
        citizenId: parseInt(form.citizenId),
        categoryId: parseInt(form.categoryId)
      });
      setMessage('✅ Kërkesa u shtua!');
      setForm({ title: '', description: '', citizenId: '', categoryId: '' });
      fetchAll();
    } catch (err) {
      setMessage('❌ Gabim: ' + (err.response?.data || 'Ndodhi një gabim'));
    }
  };

  const handleStatus = async (id, status) => {
    await updateRequestStatus(id, { status, officerNotes: 'Përditësuar nga zyrtari' });
    if (isSearching) handleSearch();
    else fetchAll();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Jeni i sigurt?')) {
      await deleteRequest(id);
      if (isSearching) handleSearch();
      else fetchAll();
    }
  };

  const inputStyle = {
    padding: '10px', borderRadius: '8px', border: '1px solid #ccc',
    width: '100%', marginBottom: '12px', fontSize: '14px'
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2 style={{ color: '#1F4E79' }}>📋 Kërkesat</h2>

      {/* SEARCH */}
      <div style={{ background: '#EBF5FB', borderRadius: '12px', padding: '20px', marginBottom: '25px' }}>
        <h3 style={{ marginTop: 0, color: '#1F4E79' }}>🔍 Kërko dhe Filtro</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: 2, minWidth: '200px' }}>
            <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '5px' }}>Kërko sipas titullit</label>
            <input
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', width: '100%', fontSize: '14px', boxSizing: 'border-box' }}
              placeholder="Shkruaj titullin..."
              value={searchTitle}
              onChange={e => setSearchTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div style={{ flex: 1, minWidth: '150px' }}>
            <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '5px' }}>Statusi</label>
            <select
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', width: '100%', fontSize: '14px' }}
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="">-- Të gjitha --</option>
              <option value="Pending">Në Pritje</option>
              <option value="InProgress">Në Process</option>
              <option value="Resolved">Zgjidhur</option>
              <option value="Rejected">Refuzuar</option>
            </select>
          </div>
          <div style={{ flex: 1, minWidth: '150px' }}>
            <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '5px' }}>Kategoria</label>
            <select
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', width: '100%', fontSize: '14px' }}
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
            >
              <option value="">-- Të gjitha --</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={handleSearch} style={{
              background: '#2E75B6', color: 'white', border: 'none',
              padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px'
            }}>🔍 Kërko</button>
            <button onClick={handleReset} style={{
              background: '#888', color: 'white', border: 'none',
              padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px'
            }}>↺ Reset</button>
          </div>
        </div>
        {isSearching && (
          <p style={{ marginTop: '10px', color: '#2E75B6', fontSize: '13px' }}>
            {requests.length > 0 ? `✅ ${requests.length} kërkesa gjetur` : '⚠️ Nuk u gjet asnjë kërkesë'}
          </p>
        )}
      </div>

      {/* FORMA */}
      <div style={{ background: '#f0f4f8', borderRadius: '12px', padding: '20px', maxWidth: '450px', marginBottom: '30px' }}>
        <h3 style={{ marginTop: 0 }}>Shto Kërkesë të Re</h3>
        <input style={inputStyle} placeholder="Titulli" value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })} />
        <textarea style={{ ...inputStyle, height: '80px', resize: 'none' }} placeholder="Përshkrimi"
          value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <select style={inputStyle} value={form.citizenId}
          onChange={e => setForm({ ...form, citizenId: e.target.value })}>
          <option value="">-- Zgjidh Qytetarin --</option>
          {citizens.map(c => <option key={c.id} value={c.id}>{c.fullName}</option>)}
        </select>
        <select style={inputStyle} value={form.categoryId}
          onChange={e => setForm({ ...form, categoryId: e.target.value })}>
          <option value="">-- Zgjidh Kategorinë --</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <button onClick={handleSubmit} style={{
          background: '#2E75B6', color: 'white', border: 'none',
          padding: '10px 25px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px'
        }}>Shto</button>
        {message && <p style={{ marginTop: '10px' }}>{message}</p>}
      </div>

      {/* LISTA */}
      <h3>Lista e Kërkesave ({requests.length})</h3>
      {requests.length === 0 ? (
        <p style={{ color: '#888', fontStyle: 'italic' }}>⚠️ Nuk u gjet asnjë kërkesë.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#2E75B6', color: 'white' }}>
              <th style={{ padding: '10px' }}>ID</th>
              <th style={{ padding: '10px' }}>Titulli</th>
              <th style={{ padding: '10px' }}>Qytetari</th>
              <th style={{ padding: '10px' }}>Kategoria</th>
              <th style={{ padding: '10px' }}>Statusi</th>
              <th style={{ padding: '10px' }}>Veprime</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r, i) => (
              <tr key={r.id} style={{ background: i % 2 === 0 ? '#f9f9f9' : 'white' }}>
                <td style={{ padding: '10px', textAlign: 'center' }}>{r.id}</td>
                <td style={{ padding: '10px' }}>{r.title}</td>
                <td style={{ padding: '10px' }}>{r.citizen?.fullName}</td>
                <td style={{ padding: '10px' }}>{r.category?.name}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  <span style={{
                    background: statusColors[r.status], color: 'white',
                    padding: '4px 10px', borderRadius: '20px', fontSize: '12px'
                  }}>{statusLabels[r.status]}</span>
                </td>
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  <select onChange={e => handleStatus(r.id, e.target.value)} defaultValue=""
                    style={{ marginRight: '8px', padding: '4px', borderRadius: '6px' }}>
                    <option value="" disabled>Ndrysho</option>
                    <option value="InProgress">Në Process</option>
                    <option value="Resolved">Zgjidhur</option>
                    <option value="Rejected">Refuzuar</option>
                  </select>
                  <button onClick={() => handleDelete(r.id)} style={{
                    background: '#FF4444', color: 'white', border: 'none',
                    padding: '4px 10px', borderRadius: '6px', cursor: 'pointer'
                  }}>Fshi</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Requests;