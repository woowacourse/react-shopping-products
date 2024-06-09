import * as S from './style';

import { useContext, useEffect, useState } from 'react';

import { UseCartItemsContext } from '../../App';
import AdjustButtonContainer from '../AdjustButtonContainer';
import AdjustButton from '../AdjustButton';
import Spinner from '../Spinner';
import QuantityText from '../QuantityText';

import { ADD_TO_CART, MINUS_BUTTON, PLUS_BUTTON, REMOVE_BUTTON } from '../../assets/images';

interface ProductItemProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

const ProductItem = ({ id, imageUrl, name, price }: ProductItemProps) => {
  const { getCartItems, addCartItem, deleteCartItem, adjustCartItemQuantity } =
    useContext(UseCartItemsContext);
  const [isLoading, setIsLoading] = useState(false);

  const cartItem = getCartItems.data
    ? getCartItems.data.find(({ product }) => id === product.id)
    : undefined;
  const isInCart = !!cartItem;

  const BUTTON_TEXT = '담기';

  const handleAddToCart = () => {
    setIsLoading(true);

    addCartItem.mutate(id, {
      onError: () => setIsLoading(false),
    });
  };

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
  }, [cartItem?.quantity]);

  return (
    <S.ProductItem>
      <S.Image src={imageUrl} alt={name + '상품 사진'} />
      <S.InformationContainer>
        <S.Information>
          <S.Name>{name}</S.Name>
          <S.Price>{price.toLocaleString('ko-KR')}원</S.Price>
        </S.Information>
        <S.ButtonContainer>
          {!isInCart && (
            <S.AddButton onClick={handleAddToCart} $isInCart={isInCart}>
              {!isLoading && (
                <>
                  <S.ButtonImage src={ADD_TO_CART} />
                  <span>{BUTTON_TEXT}</span>
                </>
              )}
              {isLoading && <Spinner />}
            </S.AddButton>
          )}
          {isInCart && (
            <AdjustButtonContainer>
              <AdjustButton onClick={handleDecreaseCartItemQuantity}>
                <img
                  src={cartItem.quantity === 1 ? REMOVE_BUTTON : MINUS_BUTTON}
                  alt={cartItem.quantity === 1 ? '삭제' : '빼기'}
                />
              </AdjustButton>
              {!isLoading && <QuantityText>{cartItem.quantity}</QuantityText>}
              {isLoading && (
                <QuantityText>
                  <Spinner />
                </QuantityText>
              )}
              <AdjustButton onClick={handleIncreaseCartItemQuantity}>
                <img src={PLUS_BUTTON} alt={'더하기'} />
              </AdjustButton>
            </AdjustButtonContainer>
          )}
        </S.ButtonContainer>
      </S.InformationContainer>
    </S.ProductItem>
  );
};

export default ProductItem;
