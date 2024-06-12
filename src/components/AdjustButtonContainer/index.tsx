import * as S from './style';

import { useContext, useEffect, useState } from 'react';

import { UseCartItemsContext } from '../../App';
import AdjustButton from '../AdjustButton';
import QuantityText from '../QuantityText';
import Spinner from '../Spinner';

import { CartItem } from '../../types/cart';
import { MINUS_BUTTON, PLUS_BUTTON, REMOVE_BUTTON } from '../../assets/images';

interface AdjustButtonContainerProps {
  cartItem: CartItem;
}

const AdjustButtonContainer = ({ cartItem }: AdjustButtonContainerProps) => {
  const { deleteCartItem, adjustCartItemQuantity } = useContext(UseCartItemsContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleDecreaseCartItemQuantity = () => {
    setIsLoading(true);

    if (cartItem?.quantity === 1) {
      return deleteCartItem.mutate(cartItem.id, {
        onError: () => setIsLoading(false),
      });
    }

    if (cartItem)
      adjustCartItemQuantity.mutate(
        { cartItemId: cartItem.id, quantity: cartItem.quantity - 1 },
        {
          onError: () => setIsLoading(false),
        },
      );
  };

  const handleIncreaseCartItemQuantity = () => {
    setIsLoading(true);

    if (cartItem)
      adjustCartItemQuantity.mutate(
        { cartItemId: cartItem.id, quantity: cartItem.quantity + 1 },
        {
          onError: () => setIsLoading(false),
        },
      );
  };

  useEffect(() => {
    setIsLoading(false);
  }, [cartItem.quantity]);

  return (
    <S.AdjustButtonContainer>
      <AdjustButton onClick={handleDecreaseCartItemQuantity}>
        <img
          src={cartItem.quantity === 1 ? REMOVE_BUTTON : MINUS_BUTTON}
          alt={cartItem.quantity === 1 ? '삭제' : '빼기'}
        />
      </AdjustButton>
      <QuantityText>{isLoading ? <Spinner /> : cartItem.quantity}</QuantityText>
      <AdjustButton onClick={handleIncreaseCartItemQuantity}>
        <img src={PLUS_BUTTON} alt={'더하기'} />
      </AdjustButton>
    </S.AdjustButtonContainer>
  );
};

export default AdjustButtonContainer;
