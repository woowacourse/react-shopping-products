import { MINUS, PLUS } from '../../../assets/images';
import * as S from './style';
import useHandleCartItems from '../../../hooks/useHandleCartItems';
import Spinner from '../Spinner';
import { useContext } from 'react';
import { ToastContext } from '../../../context/ToastProvider';

interface QuantityProps {
  cartId: number;
  quantity: number;
  deleteIfZero: boolean;
}

const Quantity = ({ cartId, quantity, deleteIfZero }: QuantityProps) => {
  const { showToast } = useContext(ToastContext);
  const { deleteCart, updateCartItemQuantity } = useHandleCartItems();

  const disabled = !deleteIfZero && quantity === 1;

  const onClickMinusButton = async () => {
    if (disabled) return;
    try {
      if (quantity === 1) {
        await deleteCart.mutateAsync(cartId);
      } else {
        await updateCartItemQuantity.mutateAsync({ cartId, quantity: quantity - 1 });
      }
    } catch (error) {
      if (error instanceof Error) showToast(error.message);
    }
  };

  const onClickPlusButton = async () => {
    try {
      await updateCartItemQuantity.mutateAsync({ cartId, quantity: quantity + 1 });
    } catch (error) {
      if (error instanceof Error) showToast(error.message);
    }
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
