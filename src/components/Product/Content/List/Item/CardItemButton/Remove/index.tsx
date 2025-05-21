import Button from "@/components/Button";
import removeCartItemIcon from "@/assets/icons/remove-cart-item.svg";
import { removeCartItem } from "@/apis/cartItems/removeCartItem";
import { getCartItems } from "@/apis/cartItems/getCartItems";
import useMutation from "@/hooks/useMutation";
import AlertToast from "@/components/AlertToast";
import { useCartContext } from "@/context/CartContext";

interface RemoveCartItemButton {
  id: number;
}

function RemoveCartItemButton({ id }: RemoveCartItemButton) {
  const { mutate, isLoading, error } = useMutation(() => removeCartItem(id));

  const { setCartItemData } = useCartContext();

  const handleClick = async () => {
    try {
      await mutate();
      const cartItems = await getCartItems();
      setCartItemData(cartItems);
    } catch (error) {
      // mutate에서 에러가 발생한 경우 이후 로직을 실행하지 않게 try-catch문을 사용합니다.
    }
  };

  return (
    <>
      {error?.message && (
        <AlertToast key={error.message} type="error" message={error.message} />
      )}

      <Button
        variant="secondary"
        type="button"
        onClick={handleClick}
        disabled={isLoading}
      >
        <img src={removeCartItemIcon} alt="장바구니 빼기" />
        빼기
      </Button>
    </>
  );
}

export default RemoveCartItemButton;
