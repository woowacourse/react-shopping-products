import * as S from "./CartItemQuantityButton.styled";
import PlusIcon from "@assets/icons/plus.svg";
import MinusIcon from "@assets/icons/minus.svg";
import RemoveCartItemButton from "../Remove";
import { updateCartItemQuantity } from "@/apis/cartItems/updateCartItemQuantity";
import useMutation from "@/hooks/useMutation";
import useToast from "@/hooks/useToast";
import { useCartItemContext } from "@/contexts/CartItemProvider";

interface CartItemQuantityButtonProps {
  cartItemId: number;
  quantity: number;
}
function CartItemQuantityButton({
  cartItemId,
  quantity,
}: CartItemQuantityButtonProps) {
  const { mutate: updateCartItemQuantityMutate, isLoading } = useMutation(
    updateCartItemQuantity
  );
  const { refetchCartItems } = useCartItemContext();
  const { addToast } = useToast();

  const onUpdateCartItemQuantity = (quantity: number) => {
    updateCartItemQuantityMutate(
      { id: cartItemId, quantity },
      {
        onSuccess: () => {
          refetchCartItems();
        },
        onError: (error) => {
          addToast({
            type: "error",
            message: error.message,
          });
        },
      }
    );
  };

  return (
    <S.ButtonWrapper>
      {quantity === 1 ? (
        <RemoveCartItemButton cartItemId={cartItemId} />
      ) : (
        <S.Button
          type="button"
          onClick={() => onUpdateCartItemQuantity(quantity - 1)}
          disabled={isLoading}
        >
          <img src={MinusIcon} alt="수량 1개 빼기" />
        </S.Button>
      )}
      <S.QuantityText data-testid="current-cart-item-quantity">
        {quantity}
      </S.QuantityText>
      <S.Button
        type="button"
        onClick={() => onUpdateCartItemQuantity(quantity + 1)}
        disabled={isLoading}
      >
        <img src={PlusIcon} alt="수량 1개 추가" />
      </S.Button>
    </S.ButtonWrapper>
  );
}

export default CartItemQuantityButton;
