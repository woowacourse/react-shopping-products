import * as S from './style';

import { useContext, useEffect, useState } from 'react';

import { UseCartItemsContext } from '../../App';
import SelectButtonContainer from '../SelectButtonContainer';
import SelectButton from '../SelectButton';
import Spinner from '../Spinner';

import { ADD_TO_CART, MINUS_BUTTON, PLUS_BUTTON, REMOVE_BUTTON } from '../../assets/images';

interface ProductItemProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

const ProductItem = ({ id, imageUrl, name, price }: ProductItemProps) => {
  const { getCartItems, addCartItem, deleteCartItem } = useContext(UseCartItemsContext);
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

  const handleRemoveFromCart = () => {
    setIsLoading(true);

    if (cartItem) {
      deleteCartItem.mutate(cartItem.id, {
        onError: () => setIsLoading(false),
      });
    }
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
            <SelectButtonContainer>
              <SelectButton onClick={handleRemoveFromCart}>
                <img
                  src={cartItem.quantity === 1 ? REMOVE_BUTTON : MINUS_BUTTON}
                  alt={cartItem.quantity === 1 ? '삭제' : '빼기'}
                />
              </SelectButton>
              {!isLoading && <S.QuantityText>{cartItem.quantity}</S.QuantityText>}
              {isLoading && (
                <S.QuantityText>
                  <Spinner />
                </S.QuantityText>
              )}
              <SelectButton onClick={handleRemoveFromCart}>
                <img src={PLUS_BUTTON} alt={'더하기'} />
              </SelectButton>
            </SelectButtonContainer>
          )}
        </S.ButtonContainer>
      </S.InformationContainer>
    </S.ProductItem>
  );
};

export default ProductItem;
