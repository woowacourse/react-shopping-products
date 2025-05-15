import Button from '../common/Button/Button';
import { addButton } from './AddButton.style';

function AddButton({ onClick }: { onClick: () => void }) {
  return (
    <Button backgroundColor="#000000" color="#ffffff" radius="4px" onClick={onClick}>
      <div className={addButton}>
        <img src="./images/addCart.png" alt="addCart" />
        <span>담기</span>
      </div>
    </Button>
  );
}

export default AddButton;
