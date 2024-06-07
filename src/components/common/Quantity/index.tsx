import { MINUS, PLUS } from '../../../assets/images';
import * as S from './style';
import useHandleCartItems from '../../../hooks/useHandleCartItems';
import Spinner from '../Spinner';

interface QuantityProps {
  cartId: number;
  quantity: number;
  deleteIfZero: boolean;
}

const Quantity = ({ cartId, quantity, deleteIfZero }: QuantityProps) => {
  const { deleteCart, updateCartItemQuantity } = useHandleCartItems();

  const disabled = !deleteIfZero && quantity === 1;

  const onClickMinusButton = () => {
    if (disabled) return;

    if (quantity === 1) {
      deleteCart.mutate(cartId);
    } else {
      updateCartItemQuantity.mutate({ cartId, quantity: quantity - 1 });
    }
  };

  const onClickPlusButton = () => {
    updateCartItemQuantity.mutate({ cartId, quantity: quantity + 1 });
  };

  return updateCartItemQuantity.isPending || deleteCart.isPending ? (
    <Spinner />
  ) : (
    <S.QuantityContainer>
      <S.CountButton disabled={disabled} $disabled={disabled} onClick={onClickMinusButton}>
        <S.CountImage src={MINUS} />
      </S.CountButton>
      <S.QuantityText>{quantity}</S.QuantityText>
      <S.CountButton $disabled={false} onClick={onClickPlusButton}>
        <S.CountImage src={PLUS} />
      </S.CountButton>
    </S.QuantityContainer>
  );
};

export default Quantity;
