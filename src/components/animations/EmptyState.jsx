import React from 'react';
import { Compass, RefreshCw } from 'lucide-react';
import FadeIn from './FadeIn';

export default function EmptyState({
  title = "No journeys found",
  description = "We couldn't find any packages matching your search criteria. Try clearing your search or switching categories.",
  onReset,
  resetLabel = "Clear Filters & Search"
}) {
  return (
    <FadeIn direction="up" className="empty-state-wrapper">
      <div className="empty-state-icon-box">
        <Compass size={40} className="empty-state-icon" />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-desc">{description}</p>
      {onReset && (
        <button onClick={onReset} className="btn-secondary empty-state-btn">
          <RefreshCw size={16} />
          <span>{resetLabel}</span>
        </button>
      )}
      <style>{`
        .empty-state-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 60px 20px;
          background: var(--bg-secondary);
          border-radius: var(--radius-xl);
          border: 1px dashed var(--border-color);
          margin: 30px 0;
        }

        .empty-state-icon-box {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: var(--accent-turquoise-light);
          color: var(--accent-teal);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .empty-state-title {
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .empty-state-desc {
          font-size: 15px;
          color: var(--text-secondary);
          max-width: 460px;
          line-height: 1.5;
          margin-bottom: 24px;
        }

        .empty-state-btn {
          cursor: pointer;
        }
      `}</style>
    </FadeIn>
  );
}
