import React, { useState, useEffect } from 'react';
import { getRequests, getCitizens } from '../services/api';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement, PointElement,
  LineElement, Title
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement,
  PointElement, LineElement, Title
);

function Home() {
  const [requests, setRequests] = useState([]);
  const [citizens, setCitizens] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [reqRes, citRes] = await Promise.all([getRequests(), getCitizens()]);
      setRequests(reqRes.data);
      setCitizens(citRes.data);
    };
    fetchData();
  }, []);

  // Stats
  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 0).length,
    inProgress: requests.filter(r => r.status === 1).length,
    resolved: requests.filter(r => r.status === 2).length,
    rejected: requests.filter(r => r.status === 3).length,
    citizens: citizens.length,
  };

  // Pie Chart — Statuset
  const pieData = {
    labels: ['Në Pritje', 'Në Process', 'Zgjidhur', 'Refuzuar'],
    datasets: [{
      data: [stats.pending, stats.inProgress, stats.resolved, stats.rejected],
      backgroundColor: ['#FFC000', '#ED7D31', '#70AD47', '#FF4444'],
      borderColor: ['#fff', '#fff', '#fff', '#fff'],
      borderWidth: 2,
    }]
  };

  // Bar Chart — Kategoritë
  const categoryCount = {};
  requests.forEach(r => {
    const name = r.category?.name || 'Të tjera';
    categoryCount[name] = (categoryCount[name] || 0) + 1;
  });

  const barData = {
    labels: Object.keys(categoryCount),
    datasets: [{
      label: 'Numri i Kërkesave',
      data: Object.values(categoryCount),
      backgroundColor: ['#2E75B6', '#ED7D31', '#70AD47', '#FFC000', '#7030A0'],
      borderRadius: 8,
    }]
  };

  // Line Chart — Kërkesa sipas datës
  const dateCount = {};
  requests.forEach(r => {
    const date = new Date(r.createdAt).toLocaleDateString('sq-AL');
    dateCount[date] = (dateCount[date] || 0) + 1;
  });

  const sortedDates = Object.keys(dateCount).sort();
  const lineData = {
    labels: sortedDates,
    datasets: [{
      label: 'Kërkesa të reja',
      data: sortedDates.map(d => dateCount[d]),
      borderColor: '#2E75B6',
      backgroundColor: 'rgba(46, 117, 182, 0.1)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#2E75B6',
      pointRadius: 5,
    }]
  };

  const cards = [
    { label: "Gjithsej Kërkesa", value: stats.total, color: "#2E75B6" },
    { label: "Në Pritje", value: stats.pending, color: "#FFC000" },
    { label: "Në Process", value: stats.inProgress, color: "#ED7D31" },
    { label: "Zgjidhur", value: stats.resolved, color: "#70AD47" },
    { label: "Refuzuar", value: stats.rejected, color: "#FF4444" },
    { label: "Qytetarë", value: stats.citizens, color: "#7030A0" },
  ];

  return (
    <div style={{ padding: '30px' }}>
      <h2 style={{ color: '#1F4E79', marginBottom: '25px' }}>📊 Dashboard</h2>

      {/* KARTAT */}
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '35px' }}>
        {cards.map((card, i) => (
          <div key={i} style={{
            background: card.color, color: 'white', borderRadius: '12px',
            padding: '20px 30px', minWidth: '140px', textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}>
            <div style={{ fontSize: '38px', fontWeight: 'bold' }}>{card.value}</div>
            <div style={{ fontSize: '13px', marginTop: '6px' }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* GRAFIQET */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '25px' }}>

        {/* PIE */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h3 style={{ color: '#1F4E79', marginTop: 0 }}>🥧 Kërkesa sipas Statusit</h3>
          <div style={{ height: '280px', display: 'flex', justifyContent: 'center' }}>
            <Pie data={pieData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
          </div>
        </div>

        {/* BAR */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h3 style={{ color: '#1F4E79', marginTop: 0 }}>📊 Kërkesa sipas Kategorisë</h3>
          <div style={{ height: '280px' }}>
            <Bar data={barData} options={{
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
            }} />
          </div>
        </div>
      </div>

      {/* LINE */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <h3 style={{ color: '#1F4E79', marginTop: 0 }}>📈 Kërkesa sipas Datës</h3>
        <div style={{ height: '250px' }}>
          <Line data={lineData} options={{
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
          }} />
        </div>
      </div>
    </div>
  );
}

export default Home;