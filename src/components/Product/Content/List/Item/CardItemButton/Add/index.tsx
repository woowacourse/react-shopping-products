import Button from "@/components/Button";
import addCartItemIcon from "@/assets/icons/add-cart-item.svg";
import useMutation from "@/hooks/useMutation";
import { addCartItems } from "@/apis/cartItems/addCartItems";
import { getCartItems } from "@/apis/cartItems/getCartItems";
import { SetCartItems } from "@/types/cartItem";
import AlertToast from "@/components/AlertToast";

interface AddCartItemButton {
  id: number;
  setCartItems: SetCartItems;
}

function AddCartItemButton({ id, setCartItems }: AddCartItemButton) {
  const { mutate, isLoading, error } = useMutation(() =>
    addCartItems({ productId: id, quantity: 1 })
  );

  const handleClick = async () => {
    await mutate();
    const cartItems = await getCartItems();
    setCartItems(cartItems);
  };

  return (
    <>
      {error?.message && <AlertToast errorMessage={error.message} />}
      <Button
        variant="primary"
        type="button"
        onClick={handleClick}
        disabled={isLoading}
      >
        <img src={addCartItemIcon} alt="장바구니 담기" />
        담기
      </Button>
    </>
  );
}

export default AddCartItemButton;
