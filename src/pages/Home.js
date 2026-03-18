import React, { useState, useEffect } from 'react';
import { getRequests, getCitizens } from '../services/api';

function Home() {
  const [stats, setStats] = useState({
    total: 0, pending: 0, inProgress: 0, resolved: 0, citizens: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [reqRes, citRes] = await Promise.all([getRequests(), getCitizens()]);
      const requests = reqRes.data;
      setStats({
        total: requests.length,
        pending: requests.filter(r => r.status === 0).length,
        inProgress: requests.filter(r => r.status === 1).length,
        resolved: requests.filter(r => r.status === 2).length,
        citizens: citRes.data.length,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Gjithsej Kërkesa", value: stats.total, color: "#2E75B6" },
    { label: "Në Pritje", value: stats.pending, color: "#FFC000" },
    { label: "Në Process", value: stats.inProgress, color: "#ED7D31" },
    { label: "Zgjidhur", value: stats.resolved, color: "#70AD47" },
    { label: "Qytetarë", value: stats.citizens, color: "#7030A0" },
  ];

  return (
    <div style={{ padding: '30px' }}>
      <h2 style={{ color: '#1F4E79', marginBottom: '30px' }}>📊 Dashboard</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {cards.map((card, i) => (
          <div key={i} style={{
            background: card.color, color: 'white', borderRadius: '12px',
            padding: '25px 35px', minWidth: '160px', textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}>
            <div style={{ fontSize: '42px', fontWeight: 'bold' }}>{card.value}</div>
            <div style={{ fontSize: '14px', marginTop: '8px' }}>{card.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;