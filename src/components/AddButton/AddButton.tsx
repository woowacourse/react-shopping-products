import { css } from '@emotion/css';
import Button from '../common/Button/Button';

const addButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

function AddButton({ onClick }: { onClick: () => void }) {
  return (
    <Button backgroundColor="#000000" color="#ffffff" radius="4px" onClick={onClick}>
      <div className={addButton}>
        <img src="/images/addCart.png" alt="addCart" />
        <span>담기</span>
      </div>
    </Button>
  );
}

export default AddButton;
