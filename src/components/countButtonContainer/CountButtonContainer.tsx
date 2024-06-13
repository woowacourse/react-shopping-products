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

  const { product, quantity } = cartItem;
  const isLoading = isUpdatePending || isDeletePending;

  return (
    <Styled.CountWrapper>
      <Styled.CountButton
        onClick={handleDecrementQuantity}
        disabled={isLoading}
        $isDisabled={isLoading}
        data-testid={`${testId}-minus`}
      >
        <img src={IMAGES.MINUS} alt={`${product.id}-minus`} />
      </Styled.CountButton>
      {isLoading ? <Spinner size={25} /> : <Styled.CountLabel>{quantity}</Styled.CountLabel>}

      <Styled.CountButton
        onClick={handleIncrementQuantity}
        disabled={isLoading}
        $isDisabled={isLoading}
        data-testid={`${testId}-plus`}
      >
        <img src={IMAGES.PLUS} alt={`${product.id}-plus`} />
      </Styled.CountButton>
    </Styled.CountWrapper>
  );
};

export default CountButtonContainer;
