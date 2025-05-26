import Button from '../common/Button/Button';
import { deleteButton } from './DeleteButton.style';

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <Button backgroundColor="#eaeaea" color="#000000" radius="4px" onClick={onClick}>
      <div className={deleteButton}>
        {/* <img src="./images/deleteCart.png" alt="deleteCart" /> */}
        <span>삭제</span>
      </div>
    </Button>
  );
}

export default DeleteButton;
