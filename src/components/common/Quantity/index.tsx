import { MINUS, PLUS } from '../../../assets/images';
import * as S from './style';
import useHandlerCartItems from '../../../hooks/useHandlerCartItems';
import Spinner from '../Spinner';

interface QuantityProps {
  cartId: number;
  quantity: number;
}

const Quantity = ({ cartId, quantity }: QuantityProps) => {
  const { deleteCart, updateCartItemQuantity } = useHandlerCartItems();

  const onClickMinusButton = () => {
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
      <S.CountButton onClick={onClickMinusButton}>
        <S.CountImage src={MINUS} />
      </S.CountButton>
      <S.QuantityText>{quantity}</S.QuantityText>
      <S.CountButton onClick={onClickPlusButton}>
        <S.CountImage src={PLUS} />
      </S.CountButton>
    </S.QuantityContainer>
  );
};

export default Quantity;
