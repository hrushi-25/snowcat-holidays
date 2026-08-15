import React from 'react';
import Skeleton from './Skeleton';

export function HeroSkeleton() {
  return (
    <div className="hero-skeleton-container container">
      <div className="hero-skeleton-card">
        <Skeleton height="100%" width="100%" borderRadius="var(--radius-xl)" />
      </div>
      <style>{`
        .hero-skeleton-container {
          margin-top: 20px;
          margin-bottom: 40px;
        }
        .hero-skeleton-card {
          width: 100%;
          height: 480px;
          border-radius: var(--radius-xl);
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .hero-skeleton-card {
            height: 380px;
          }
        }
      `}</style>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="table-skeleton-container">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="table-skeleton-row">
          <Skeleton width="18%" height="18px" borderRadius="4px" />
          <Skeleton width="22%" height="18px" borderRadius="4px" />
          <Skeleton width="12%" height="18px" borderRadius="4px" />
          <Skeleton width="15%" height="18px" borderRadius="4px" />
          <Skeleton width="10%" height="24px" borderRadius="50px" />
          <Skeleton width="12%" height="32px" borderRadius="50px" />
        </div>
      ))}
      <style>{`
        .table-skeleton-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 16px 0;
        }
        .table-skeleton-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }
      `}</style>
    </div>
  );
}
