import { ButtonStyles } from "./Button.emotion";
import { css } from "@emotion/css";

interface AddButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const AddButton = ({ onClick, disabled }: AddButtonProps) => {
  return (
    <button className={AddButtonStyles} onClick={onClick} disabled={disabled}>
      <img src="./addShoppingCart.svg" />
      <div className={AddButtonTextStyles}>담기</div>
    </button>
  );
};

export default AddButton;

const AddButtonStyles = css`
  ${ButtonStyles};
  background-color: black;
  margin-left: auto;
  &:disabled {
    cursor: not-allowed;
  }
`;

const AddButtonTextStyles = css`
  color: white;
`;
