import Button from "../common/Button/Button";
import RemoveShoppingCart from "/RemoveShoppingCart.svg";

interface RemoveButtonProps {
  handleRemoveProduct: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function RemoveButton({ handleRemoveProduct }: RemoveButtonProps) {
  return (
    <Button color="light" onClick={handleRemoveProduct}>
      <img src={RemoveShoppingCart} />
      빼기
    </Button>
  );
}

export default RemoveButton;
