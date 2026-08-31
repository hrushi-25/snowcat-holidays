import React from 'react';
import Skeleton from './Skeleton';

export default function CardSkeleton({ count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card-skeleton-wrapper">
          <Skeleton height="200px" borderRadius="var(--radius-xl) var(--radius-xl) 0 0" />
          <div className="card-skeleton-content">
            <div className="flex-between">
              <Skeleton width="80px" height="14px" borderRadius="50px" />
              <Skeleton width="90px" height="14px" borderRadius="50px" />
            </div>
            <Skeleton width="85%" height="22px" borderRadius="6px" style={{ marginTop: '12px' }} />
            <Skeleton width="60%" height="16px" borderRadius="6px" style={{ marginTop: '8px' }} />
            <div className="card-skeleton-divider"></div>
            <div className="flex-between align-end">
              <div>
                <Skeleton width="50px" height="10px" borderRadius="4px" />
                <Skeleton width="100px" height="24px" borderRadius="6px" style={{ marginTop: '4px' }} />
              </div>
              <Skeleton width="44px" height="44px" borderRadius="50%" />
            </div>
          </div>
        </div>
      ))}
      <style>{`
        .card-skeleton-wrapper {
          background-color: var(--bg-secondary);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-subtle);
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
        }

        .card-skeleton-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .flex-between {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .align-end {
          align-items: flex-end;
        }

        .card-skeleton-divider {
          height: 1px;
          background-color: var(--border-color);
          margin: 18px 0;
        }
      `}</style>
    </>
  );
}
