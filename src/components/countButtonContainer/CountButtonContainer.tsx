import * as Styled from './CountButtonContainer.styled';

import { IMAGES } from '@/assets';
import { CartItemInfo } from '@/types/cartItem';

import useCounter from '@/hooks/useCounter';

interface CountButtonContainerProps {
  item: CartItemInfo;
  testId?: string;
}

const CountButtonContainer = ({ item, testId }: CountButtonContainerProps) => {
  const { handleDecrementQuantity, handleIncrementQuantity } = useCounter(item);

  return (
    <Styled.CountWrapper>
      <Styled.CountButton onClick={handleDecrementQuantity} data-testid={`${testId}-minus`}>
        <img src={IMAGES.MINUS} alt={`${item.product.id}-minus`} />
      </Styled.CountButton>
      <span>{item.quantity}</span>
      <Styled.CountButton onClick={handleIncrementQuantity} data-testid={`${testId}-plus`}>
        <img src={IMAGES.PLUS} alt={`${item.product.id}-plus`} />
      </Styled.CountButton>
    </Styled.CountWrapper>
  );
};

export default CountButtonContainer;
