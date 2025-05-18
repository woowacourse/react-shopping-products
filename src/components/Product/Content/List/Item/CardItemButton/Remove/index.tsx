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
  const { mutate: removeFromCartMutate, isLoading } = useMutation(() =>
    removeCartItem(id)
  );
  const { addToast } = useToast();

  const handleRemoveCartItemButtonClick = () => {
    removeFromCartMutate(undefined, {
      onSuccess: async () => {
        const cartItems = await getCartItems();
        updateCartItems(cartItems);
      },
      onError: (error) => {
        addToast({
          type: "error",
          message: error.message,
        });
      },
    });
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
