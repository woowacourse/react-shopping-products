import { loadingStateStyle } from './LoadingSpinner.styled';

const LoadingSpinner = () => {
  return (
    <div css={loadingStateStyle}>
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
