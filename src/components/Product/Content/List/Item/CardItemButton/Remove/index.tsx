import Button from "@/components/Button";
import removeCartItemIcon from "@/assets/icons/remove-cart-item.svg";
import { SetCartItems } from "@/types/cartItem";
import { removeCartItem } from "@/apis/cartItems/removeCartItem";
import { getCartItems } from "@/apis/cartItems/getCartItems";
import useMutation from "@/hooks/useMutation";
import AlertToast from "@/components/AlertToast";

interface RemoveCartItemButton {
  id: number;
  setCartItems: SetCartItems;
}

function RemoveCartItemButton({ id, setCartItems }: RemoveCartItemButton) {
  const { mutate, isLoading, error } = useMutation(() => removeCartItem(id));

  const handleClick = async () => {
    try {
      await mutate();
      const cartItems = await getCartItems();
      setCartItems(cartItems);
    } catch (error) {}
  };

  return (
    <>
      {error?.message && <AlertToast errorMessage={error.message} />}

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
