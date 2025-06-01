import * as S from "./CartItemQuantityButton.styled";
import PlusIcon from "@assets/icons/plus.svg";
import MinusIcon from "@assets/icons/minus.svg";
import RemoveCartItemButton from "../Remove";
import { patchCartItemQuantity } from "@/apis/cartItems/patchCartItemQuantity";
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
    patchCartItemQuantity
  );
  const { refetchCartItems } = useCartItemContext();
  const { addToast } = useToast();

  const updateCartItemQuantity = (quantity: number) => {
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
          onClick={() => updateCartItemQuantity(quantity - 1)}
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
        onClick={() => updateCartItemQuantity(quantity + 1)}
        disabled={isLoading}
      >
        <img src={PlusIcon} alt="수량 1개 추가" />
      </S.Button>
    </S.ButtonWrapper>
  );
}

export default CartItemQuantityButton;
