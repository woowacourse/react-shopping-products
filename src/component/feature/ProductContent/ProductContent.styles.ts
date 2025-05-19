import { css } from '@emotion/react';

export const emptyStateStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  grid-column: span 2;

  svg {
    margin-bottom: 16px;
    color: #cccccc;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: #333;
  }

  p {
    color: #666;
    max-width: 400px;
    margin: 0 auto;
  }
`;

export const loadingStateStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 30rem;
  width: 100%;
  grid-column: span 2;

  .loading-spinner {
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: #3498db;
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
