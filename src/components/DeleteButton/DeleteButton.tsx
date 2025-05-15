import { css } from '@emotion/css';
import Button from '../common/Button/Button';

const deleteButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <Button backgroundColor="#eaeaea" color="#000000" radius="4px" onClick={onClick}>
      <div className={deleteButton}>
        <img src="./images/deleteCart.png" alt="deleteCart" />
        <span>빼기</span>
      </div>
    </Button>
  );
}

export default DeleteButton;
