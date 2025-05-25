import { removeCartItem } from "@/apis/cartItems/removeCartItem";
import useMutation from "@/hooks/useMutation";
import useToast from "@/hooks/useToast";
import { useCartItemContext } from "@/contexts/CartItemProvider";
import RemoveCartItemIcon from "@assets/icons/remove-cart-item.svg";
import * as S from "./RemoveCartItemButton.styled";

interface RemoveCartItemButtonProps {
  cartItemId: number;
}

function RemoveCartItemButton({ cartItemId }: RemoveCartItemButtonProps) {
  const { mutate: removeFromCartMutate, isLoading } = useMutation(() =>
    removeCartItem(cartItemId)
  );
  const { refetchCartItems } = useCartItemContext();
  const { addToast } = useToast();

  const onRemoveCartItem = () => {
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
      <S.Button type="button" onClick={onRemoveCartItem} disabled={isLoading}>
        <img src={RemoveCartItemIcon} alt="장바구니에서 제거" />
      </S.Button>
    </>
  );
}

export default RemoveCartItemButton;
