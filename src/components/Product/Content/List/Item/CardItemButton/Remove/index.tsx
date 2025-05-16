import Button from "@/components/Button";
import removeCartItemIcon from "@/assets/icons/remove-cart-item.svg";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { removeCartItem } from "@/apis/cartItems/removeCartItem";
import { getCartItems } from "@/apis/cartItems/getCartItems";
import useMutation from "@/hooks/useMutation";
import AlertToast from "@/components/AlertToast";

interface RemoveCartItemButtonProps {
  id: number;
  updateCartItems: (newCartItems: CartItemType[]) => void;
}

function RemoveCartItemButton({
  id,
  updateCartItems,
}: RemoveCartItemButtonProps) {
  const {
    mutate: removeFromCart,
    isLoading,
    error,
  } = useMutation(() => removeCartItem(id));

  const handleRemoveCartItemButtonClick = async () => {
    try {
      await removeFromCart();
      const cartItems = await getCartItems();
      updateCartItems(cartItems);
    } catch (error) {
      // mutate에서 에러가 발생한 경우 이후 로직을 실행하지 않게 try-catch문을 사용합니다.
    }
  };

  return (
    <>
      {error?.message && <AlertToast errorMessage={error.message} />}

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
