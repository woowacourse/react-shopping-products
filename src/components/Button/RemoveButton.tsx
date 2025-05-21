import { css } from "@emotion/css";
import { ButtonStyles } from "./Button.emotion";
interface RemoveButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const RemoveButton = ({ onClick, disabled }: RemoveButtonProps) => {
  return (
    <button
      className={RemoveButtonStyles}
      onClick={onClick}
      disabled={disabled}
    >
      <img src="./removeShoppingCart.svg" />
      <div className={RemoveButtonTextStyles}>빼기</div>
    </button>
  );
};

export default RemoveButton;

const RemoveButtonStyles = css`
  ${ButtonStyles};
  background-color: #eaeaea;
`;

const RemoveButtonTextStyles = css`
  color: black;
`;
