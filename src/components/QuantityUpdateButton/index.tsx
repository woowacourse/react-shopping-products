import Icon from "@/components/_common/Icon";
import * as S from "@/components/QuantityUpdateButton/style";
import useUpdateItemQuantity from "@/hooks/useUpdateCartQuantity";

const QuantityUpdateButton = ({ quantity, cartId }: { quantity: number; cartId: number }) => {
  const { increaseQuantity, decreaseQuantity } = useUpdateItemQuantity();

  return (
    <S.UpdateButtonWrapper>
      <Icon kind="minus" onClick={() => decreaseQuantity({ cartId, itemQuantity: quantity })} />
      <S.ProductQuantity>{quantity}</S.ProductQuantity>
      <Icon kind="plus" onClick={() => increaseQuantity({ cartId, itemQuantity: quantity })} />
    </S.UpdateButtonWrapper>
  );
};

export default QuantityUpdateButton;
