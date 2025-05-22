import { ComponentProps } from "react";

import Button from "../common/Button/Button";

import AddShoppingCart from "/AddShoppingCart.svg";

interface AddButtonProps extends ComponentProps<"button"> {
  handleAddProduct: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function AddButton({ handleAddProduct, disabled }: AddButtonProps) {
  return (
    <Button color="dark" onClick={handleAddProduct} disabled={disabled}>
      <img src={AddShoppingCart} />
      담기
    </Button>
  );
}

export default AddButton;
