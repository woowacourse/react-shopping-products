import { ButtonStyles } from "./Button.emotion";
import { css } from "@emotion/css";

const AddButton = () => {
  return (
    <button className={AddButtonStyles}>
      <img src="/addShoppingCart.svg" />
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
