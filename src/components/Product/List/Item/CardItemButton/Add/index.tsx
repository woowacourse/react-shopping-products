import Button from "@/components/Button";
import addCartItemIcon from "@/assets/icons/add-cart-item.svg";

interface AddCartItemButton {
  onClick: () => void;
}

function AddCartItemButton({ onClick }: AddCartItemButton) {
  return (
    <Button variant="primary" type="button" onClick={onClick}>
      <img src={addCartItemIcon} alt="장바구니 담기" />
      담기
    </Button>
  );
}

export default AddCartItemButton;
