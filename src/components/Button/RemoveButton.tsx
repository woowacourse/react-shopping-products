import { css } from "@emotion/css";
import { ButtonStyles } from "./Button.emotion";
interface RemoveButtonProps {
  onClick: () => void;
}

const RemoveButton = ({ onClick }: RemoveButtonProps) => {
  return (
    <button className={RemoveButtonStyles} onClick={onClick}>
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
