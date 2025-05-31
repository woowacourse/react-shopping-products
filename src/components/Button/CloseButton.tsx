import { css } from '@emotion/css';

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton = ({ onClick }: CloseButtonProps) => {
  return (
    <button className={CloseButtonStyles} onClick={onClick}>
      <div className={CloseButtonTextStyles}>닫기</div>
    </button>
  );
};

export default CloseButton;

const CloseButtonStyles = css`
  border-radius: 5px;
  background-color: #333333;
  padding: 8px auto;
  width: 100%;
  cursor: pointer;
  border: none;
  min-height: 44px;
`;

const CloseButtonTextStyles = css`
  color: white;
`;
