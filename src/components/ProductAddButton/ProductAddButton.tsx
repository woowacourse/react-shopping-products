import Button from "../common/Button/Button";

import AddShoppingCart from "/AddShoppingCart.svg";

interface ProductAddButtonProps {
  handleAddProduct: () => void;
}

function ProductAddButton({ handleAddProduct }: ProductAddButtonProps) {
  return (
    <Button color="dark" onClick={handleAddProduct}>
      <img src={AddShoppingCart} />
      담기
    </Button>
  );
}

export default ProductAddButton;
