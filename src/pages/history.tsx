import React from 'react';
import { MainLayout } from '../components/MainLayout';

const HistoryPage: React.FC = () => {
  return (
    <MainLayout>
      <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>History</h1>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
          View your activity history here.
        </p>

        <div style={{
          padding: '60px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          textAlign: 'center',
          color: '#9ca3af'
        }}>
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            style={{ margin: '0 auto 1rem' }}
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#6b7280' }}>
            Activity History
          </h3>
          <p>This page is ready for your history features.</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default HistoryPage;
