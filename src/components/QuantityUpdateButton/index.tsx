import Icon from "@/components/_common/Icon";
import * as S from "@/components/QuantityUpdateButton/style";
import { useUpdateCartItemQuantityMutation } from "@/hooks/server/useCartItems";

const QuantityUpdateButton = ({ quantity, cartId }: { quantity: number; cartId: number }) => {
  const plusMutation = useUpdateCartItemQuantityMutation({ cartId: cartId, quantity: quantity + 1 });
  const minusMutation = useUpdateCartItemQuantityMutation({ cartId: cartId, quantity: quantity - 1 });

  console.log("cartId", cartId);

  const onPlusQuantity = () => {
    plusMutation.mutate();
  };

  const onMinusQuantity = () => {
    minusMutation.mutate();
  };

  return (
    <S.UpdateButtonWrapper>
      <Icon kind="minus" onClick={onMinusQuantity} />
      <S.ProductQuantity>{quantity}</S.ProductQuantity>
      <Icon kind="plus" onClick={onPlusQuantity} />
    </S.UpdateButtonWrapper>
  );
};

export default QuantityUpdateButton;
