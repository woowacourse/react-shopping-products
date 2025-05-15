import Button from "../common/Button/Button";

import AddShoppingCart from "/AddShoppingCart.svg";

interface AddButtonProps {
  handleAddProduct: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function AddButton({ handleAddProduct }: AddButtonProps) {
  return (
    <Button color="dark" onClick={handleAddProduct}>
      <img src={AddShoppingCart} />
      담기
    </Button>
  );
}

export default AddButton;
