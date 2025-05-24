import Button from "@/components/Button";
import addCartItemIcon from "@/assets/icons/add-cart-item.svg";
import useMutation from "@/hooks/useMutation";
import { addCartItems } from "@/apis/cartItems/addCartItems";

import useToast from "@/hooks/useToast";
import { useCartItemContext } from "@/contexts/CartItemProvider";

interface AddCartItemButtonProps {
  id: number;
}

function AddCartItemButton({ id }: AddCartItemButtonProps) {
  const { mutate: addToCartMutate, isLoading } = useMutation(() =>
    addCartItems({ productId: id, quantity: 1 })
  );
  const { refetchCartItems } = useCartItemContext();
  const { addToast } = useToast();

  const handleAddCartItemButtonClick = () => {
    addToCartMutate(undefined, {
      onSuccess: () => {
        refetchCartItems();
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
