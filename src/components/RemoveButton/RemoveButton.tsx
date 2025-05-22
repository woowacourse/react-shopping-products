import { ComponentProps } from "react";

import Button from "../common/Button/Button";
import RemoveShoppingCart from "/RemoveShoppingCart.svg";

interface RemoveButtonProps extends ComponentProps<"button"> {
  handleRemoveProduct: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function RemoveButton({ handleRemoveProduct, disabled }: RemoveButtonProps) {
  return (
    <Button color="light" onClick={handleRemoveProduct} disabled={disabled}>
      <img src={RemoveShoppingCart} />
      빼기
    </Button>
  );
}

export default RemoveButton;
