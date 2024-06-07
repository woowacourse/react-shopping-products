import * as Styled from './CountButtonContainer.styled';

import { IMAGES } from '@/assets';
import { CartItemInfo } from '@/types/cartItem';

import useCounter from '@/hooks/useCounter';

interface CountButtonContainerProps {
  item: CartItemInfo;
}

const CountButtonContainer = ({ item }: CountButtonContainerProps) => {
  const { handleDecrementQuantity, handleIncrementQuantity, isPending } = useCounter(item);

  return (
    <Styled.CountWrapper>
      <Styled.CountButton onClick={handleDecrementQuantity}>
        <img src={IMAGES.MINUS} />
      </Styled.CountButton>
      {isPending ? (
        <Styled.LoadingWrapper>
          <Styled.LoadingSpinner />
        </Styled.LoadingWrapper>
      ) : (
        <span>{item.quantity}</span>
      )}
      <Styled.CountButton onClick={handleIncrementQuantity}>
        <img src={IMAGES.PLUS} />
      </Styled.CountButton>
    </Styled.CountWrapper>
  );
};

export default CountButtonContainer;
