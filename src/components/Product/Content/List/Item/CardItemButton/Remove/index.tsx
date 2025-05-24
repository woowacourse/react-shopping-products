import Button from "@/components/Button";
import removeCartItemIcon from "@/assets/icons/remove-cart-item.svg";
import { removeCartItem } from "@/apis/cartItems/removeCartItem";
import useMutation from "@/hooks/useMutation";
import useToast from "@/hooks/useToast";
import { useCartItemContext } from "@/contexts/CartItemProvider";

interface RemoveCartItemButtonProps {
  id: number;
}

function RemoveCartItemButton({ id }: RemoveCartItemButtonProps) {
  const { mutate: removeFromCartMutate, isLoading } = useMutation(() =>
    removeCartItem(id)
  );
  const { refetchCartItems } = useCartItemContext();
  const { addToast } = useToast();

  const handleRemoveCartItemButtonClick = () => {
    removeFromCartMutate(undefined, {
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
