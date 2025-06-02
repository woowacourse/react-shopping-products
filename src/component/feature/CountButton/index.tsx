import {
  countButtonButtonStyle,
  countButtonContainer,
} from './CountButton.styles';

interface CountButtonProps {
  count: number;
  onChange: (newCount: number) => void;
  isLoading?: boolean;
}

const CountButton = ({
  count,
  onChange,
  isLoading = false,
}: CountButtonProps) => {
  const handleCount = (type: 'plus' | 'minus') => {
    const newCount = type === 'plus' ? count + 1 : Math.max(0, count - 1);
    if (count !== newCount) {
      onChange(newCount);
    }
  };

  return (
    <div css={countButtonContainer}>
      <button
        css={countButtonButtonStyle}
        onClick={() => handleCount('minus')}
        disabled={count === 0 || isLoading}
      >
        -
      </button>
      <span>{count}</span>
      <button
        css={countButtonButtonStyle}
        onClick={() => handleCount('plus')}
        disabled={isLoading}
      >
        +
      </button>
    </div>
  );
};

export default CountButton;
