import Button from "../../common/Button/Button";

import AddShoppingCart from "/AddShoppingCart.svg";

interface ProductAddButtonProps {
  disabled: boolean;
  handleAddProduct: () => void;
}

function ProductAddButton({
  disabled,
  handleAddProduct,
}: ProductAddButtonProps) {
  return (
    <Button color="dark" onClick={handleAddProduct} disabled={disabled}>
      <img src={AddShoppingCart} />
      담기
    </Button>
  );
}

export default ProductAddButton;
