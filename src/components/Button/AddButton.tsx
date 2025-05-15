import { ButtonStyles } from './Button.emotion';
import { css } from '@emotion/css';

interface AddButtonProps {
  onClick: () => void;
}

const AddButton = ({ onClick }: AddButtonProps) => {
  return (
    <button className={AddButtonStyles} onClick={onClick}>
      <img src="./addShoppingCart.svg" />
      <div className={AddButtonTextStyles}>담기</div>
    </button>
  );
};

export default AddButton;

const AddButtonStyles = css`
  ${ButtonStyles};
  background-color: black;
`;

const AddButtonTextStyles = css`
  color: white;
`;
