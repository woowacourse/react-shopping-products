import Button from "@/components/Button";
import addCartItemIcon from "@/assets/icons/add-cart-item.svg";
import useMutation from "@/hooks/useMutation";
import { addCartItems } from "@/apis/cartItems/addCartItems";
import { getCartItems } from "@/apis/cartItems/getCartItems";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import useToast from "@/hooks/useToast";

interface AddCartItemButtonProps {
  id: number;
  updateCartItems: (newCartItems: CartItemType[]) => void;
}

function AddCartItemButton({ id, updateCartItems }: AddCartItemButtonProps) {
  const { mutate: addToCartMutate, isLoading } = useMutation(() =>
    addCartItems({ productId: id, quantity: 1 })
  );
  const { addToast } = useToast();

  const handleAddCartItemButtonClick = () => {
    addToCartMutate(undefined, {
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
