import * as Styled from './CountButtonContainer.styled';
import Spinner from '../common/spinner/Spinner';

import { IMAGES } from '@/assets';
import { CartItemInfo } from '@/types/cartItem';

import useCounter from '@/hooks/useCounter';

interface CountButtonContainerProps {
  cartItem: CartItemInfo;
  testId?: string;
}

const CountButtonContainer = ({ cartItem, testId }: CountButtonContainerProps) => {
  const { handleDecrementQuantity, handleIncrementQuantity, isUpdatePending, isDeletePending } =
    useCounter(cartItem);

  const isLoading = isUpdatePending || isDeletePending;

  return (
    <Styled.CountWrapper>
      <Styled.CountButton onClick={handleDecrementQuantity} data-testid={`${testId}-minus`}>
        <img src={IMAGES.MINUS} alt={`${cartItem.product.id}-minus`} />
      </Styled.CountButton>
      {isLoading ? <Spinner size={25} /> : <span>{cartItem.quantity}</span>}
      <Styled.CountButton onClick={handleIncrementQuantity} data-testid={`${testId}-plus`}>
        <img src={IMAGES.PLUS} alt={`${cartItem.product.id}-plus`} />
      </Styled.CountButton>
    </Styled.CountWrapper>
  );
};

export default CountButtonContainer;
