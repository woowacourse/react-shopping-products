import * as S from './style';

import { useContext, useEffect, useState } from 'react';

import { UseCartItemsContext } from '../../App';

import { ADD_TO_CART, REMOVE_TO_CART } from '../../assets/images';

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

  const TOGGLE_BUTTON_ICON = isInCart ? REMOVE_TO_CART : ADD_TO_CART;
  const BUTTON_TEXT = isInCart ? '빼기' : '담기';

  const handleOnToggle = () => {
    setIsLoading(true);

    if (cartItem) {
      deleteCartItem.mutate(cartItem.id, {
        onError: () => setIsLoading(false),
      });
    } else {
      addCartItem.mutate(id, {
        onError: () => setIsLoading(false),
      });
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, [getCartItems.data]);

  return (
    <S.ProductItem>
      <S.Image src={imageUrl} alt={name + '상품 사진'} />
      <S.InformationContainer>
        <S.Information>
          <S.Name>{name}</S.Name>
          <S.Price>{price.toLocaleString('ko-KR')}원</S.Price>
        </S.Information>
        <S.ButtonContainer>
          <S.ToggleButton onClick={handleOnToggle} $isInCart={isInCart}>
            {!isLoading && (
              <>
                <S.ButtonImage src={TOGGLE_BUTTON_ICON} />
                <span>{BUTTON_TEXT}</span>
              </>
            )}
            {isLoading && <span>loading...</span>}
          </S.ToggleButton>
        </S.ButtonContainer>
      </S.InformationContainer>
    </S.ProductItem>
  );
};

export default ProductItem;
