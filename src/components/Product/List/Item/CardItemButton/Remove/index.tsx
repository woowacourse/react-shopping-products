import Button from "@/components/Button";
import removeCartItemIcon from "@/assets/icons/remove-cart-item.svg";

interface RemoveCartItemButton {
  onClick: () => void;
}

function RemoveCartItemButton({ onClick }: RemoveCartItemButton) {
  return (
    <Button variant="secondary" type="button" onClick={onClick}>
      <img src={removeCartItemIcon} alt="장바구니 빼기" />
      빼기
    </Button>
  );
}

export default RemoveCartItemButton;
