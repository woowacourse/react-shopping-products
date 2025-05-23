import { css } from '@emotion/react';

export const errorContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 400px;
  padding: 2rem;

  margin-top: 50%;
`;

export const errorContentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 500px;
  padding: 2.5rem;
  border-radius: 16px;
  background: linear-gradient(145deg, #ffffff, #f5f5f5);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05), 0 8px 16px rgba(0, 0, 0, 0.05),
    inset 0 -2px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const errorIconStyle = css`
  color: #ff3b30;
  margin-bottom: 1.5rem;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export const errorTitleStyle = css`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1c1c1e;
`;

export const errorMessageStyle = css`
  margin-bottom: 1.5rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background-color: rgba(255, 59, 48, 0.1);
  border-left: 3px solid #ff3b30;
  width: 100%;
  text-align: left;
`;

export const buttonContainerStyle = css`
  margin-top: 1rem;
`;
