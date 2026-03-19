import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '20px' }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          padding: '8px 14px', borderRadius: '8px', border: '1px solid #ccc',
          background: currentPage === 1 ? '#f0f0f0' : '#2E75B6',
          color: currentPage === 1 ? '#999' : 'white',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          fontSize: '14px'
        }}>
        ← Para
      </button>

      {pages.map(page => (
        <button key={page} onClick={() => onPageChange(page)} style={{
          padding: '8px 14px', borderRadius: '8px', border: '1px solid #ccc',
          background: currentPage === page ? '#1F4E79' : 'white',
          color: currentPage === page ? 'white' : '#333',
          cursor: 'pointer', fontSize: '14px',
          fontWeight: currentPage === page ? 'bold' : 'normal'
        }}>
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          padding: '8px 14px', borderRadius: '8px', border: '1px solid #ccc',
          background: currentPage === totalPages ? '#f0f0f0' : '#2E75B6',
          color: currentPage === totalPages ? '#999' : 'white',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          fontSize: '14px'
        }}>
        Pas →
      </button>

      <span style={{ color: '#666', fontSize: '13px', marginLeft: '10px' }}>
        Faqe {currentPage} nga {totalPages}
      </span>
    </div>
  );
}

export default Pagination;