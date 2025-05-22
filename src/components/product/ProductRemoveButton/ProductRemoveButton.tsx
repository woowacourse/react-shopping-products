import Button from "../../common/Button/Button";
import RemoveShoppingCart from "/RemoveShoppingCart.svg";

interface ProductRemoveButtonProps {
  handleRemoveProduct: () => void;
}

function ProductRemoveButton({
  handleRemoveProduct,
}: ProductRemoveButtonProps) {
  return (
    <Button color="light" onClick={handleRemoveProduct}>
      <img src={RemoveShoppingCart} />
      빼기
    </Button>
  );
}

export default ProductRemoveButton;
