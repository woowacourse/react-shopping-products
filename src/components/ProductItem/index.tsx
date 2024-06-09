import * as S from './style';

import { useContext, useEffect, useState } from 'react';

import { UseCartItemsContext } from '../../App';
import AdjustButtonContainer from '../AdjustButtonContainer';
import Spinner from '../Spinner';

import { ADD_TO_CART } from '../../assets/images';

interface ProductItemProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

const ProductItem = ({ id, imageUrl, name, price }: ProductItemProps) => {
  const { getCartItems, addCartItem } = useContext(UseCartItemsContext);
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
          {isInCart && <AdjustButtonContainer cartItem={cartItem} />}
        </S.ButtonContainer>
      </S.InformationContainer>
    </S.ProductItem>
  );
};

export default ProductItem;
