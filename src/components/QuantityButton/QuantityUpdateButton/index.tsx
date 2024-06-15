import Icon from "@/components/_common/Icon";
import * as S from "@/components/QuantityButton/QuantityUpdateButton/style";
import useUpdateItemQuantity from "@/hooks/useUpdateCartQuantity";
import LoadingSpinner from "@/assets/loading.gif";

const QuantityUpdateButton = ({ quantity, cartId }: { quantity: number; cartId: number }) => {
  const { increaseQuantity, decreaseQuantity, isPending, error } = useUpdateItemQuantity();

  if (error) {
    throw error;
  }

  return (
    <S.UpdateButtonWrapper>
      <Icon kind="minus" onClick={() => decreaseQuantity({ cartId, itemQuantity: quantity })} />
      {isPending ? <S.LoadingSpinner src={LoadingSpinner} /> : <S.ProductQuantity>{quantity}</S.ProductQuantity>}
      <Icon kind="plus" onClick={() => increaseQuantity({ cartId, itemQuantity: quantity })} />
    </S.UpdateButtonWrapper>
  );
};

export default QuantityUpdateButton;
