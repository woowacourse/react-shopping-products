import Button from "@/components/Button";
import addCartItemIcon from "@/assets/icons/add-cart-item.svg";
import useMutation from "@/hooks/useMutation";
import { addCartItems } from "@/apis/cartItems/addCartItems";
import { getCartItems } from "@/apis/cartItems/getCartItems";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import AlertToast from "@/components/AlertToast";

interface AddCartItemButtonProps {
  id: number;
  updateCartItems: (newCartItems: CartItemType[]) => void;
}

function AddCartItemButton({ id, updateCartItems }: AddCartItemButtonProps) {
  const {
    mutate: addToCart,
    isLoading,
    error,
  } = useMutation(() => addCartItems({ productId: id, quantity: 1 }));

  const handleAddCartItemButtonClick = async () => {
    try {
      await addToCart();
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
        variant="primary"
        type="button"
        onClick={handleAddCartItemButtonClick}
        disabled={isLoading}
      >
        <img src={addCartItemIcon} alt="장바구니 담기" />
        담기
      </Button>
    </>
  );
}

export default AddCartItemButton;
