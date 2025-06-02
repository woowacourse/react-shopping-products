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
  border-radius: 4px;
  display: flex;
  padding: 4px 8px;
  gap: 4px;
  border: none;
  cursor: pointer;
  background-color: black;
`;

const AddButtonTextStyles = css`
  color: white;
`;
