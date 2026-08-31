import React from 'react';

export default function Skeleton({
  width = '100%',
  height = '20px',
  borderRadius = 'var(--radius-sm)',
  className = '',
  style = {},
}) {
  return (
    <div
      className={`skeleton-base ${className}`}
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
    >
      <style>{`
        .skeleton-base {
          background: linear-gradient(
            90deg,
            rgba(226, 236, 239, 0.4) 0%,
            rgba(226, 236, 239, 0.9) 50%,
            rgba(226, 236, 239, 0.4) 100%
          );
          background-size: 200% 100%;
          animation: skeletonShimmer 1.6s ease-in-out infinite;
          display: inline-block;
        }

        @keyframes skeletonShimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .skeleton-base {
            animation: none;
            background: rgba(226, 236, 239, 0.7);
          }
        }
      `}</style>
    </div>
  );
}
