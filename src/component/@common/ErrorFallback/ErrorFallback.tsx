import Text from '../Text/Text';
import Button from '../Button/Button';
import {
  buttonContainerStyle,
  errorContainerStyle,
  errorContentStyle,
  errorIconStyle,
  errorMessageStyle,
  errorTitleStyle,
} from './ErrorFallback.styles';

interface ErrorFallbackProps {
  error?: Error;
  onRetryClick?: () => void;
  message?: string;
}

const ErrorFallback = ({
  error,
  onRetryClick,
  message = '문제가 발생했습니다',
}: ErrorFallbackProps) => {
  return (
    <div css={errorContainerStyle}>
      <div css={errorContentStyle}>
        <div css={errorIconStyle}>
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2 css={errorTitleStyle}>{message}</h2>
        {error && (
          <div css={errorMessageStyle}>
            <Text variant="description">{error.message}</Text>
          </div>
        )}
        {onRetryClick && (
          <div css={buttonContainerStyle}>
            <Button onClick={onRetryClick}>다시 시도하기</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorFallback;
