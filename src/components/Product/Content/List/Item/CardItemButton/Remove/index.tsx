import Button from "@/components/Button";
import removeCartItemIcon from "@/assets/icons/remove-cart-item.svg";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { removeCartItem } from "@/apis/cartItems/removeCartItem";
import { getCartItems } from "@/apis/cartItems/getCartItems";
import useMutation from "@/hooks/useMutation";
import useToast from "@/hooks/useToast";

interface RemoveCartItemButtonProps {
  id: number;
  updateCartItems: (newCartItems: CartItemType[]) => void;
}

function RemoveCartItemButton({
  id,
  updateCartItems,
}: RemoveCartItemButtonProps) {
  const { mutate: removeFromCart, isLoading } = useMutation(() =>
    removeCartItem(id)
  );
  const { addToast } = useToast();

  const handleRemoveCartItemButtonClick = async () => {
    try {
      await removeFromCart();
      const cartItems = await getCartItems();
      updateCartItems(cartItems);
    } catch (error) {
      addToast({
        type: "error",
        message: "장바구니에서 상품을 삭제하는 중 에러가 발생했습니다.",
      });
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        type="button"
        onClick={handleRemoveCartItemButtonClick}
        disabled={isLoading}
      >
        <img src={removeCartItemIcon} alt="장바구니 빼기" />
        빼기
      </Button>
    </>
  );
}

export default RemoveCartItemButton;
