import * as S from './style';

import { useEffect, useState } from 'react';

import useCart from '../../hooks/useCart';

import { ADD_TO_CART, REMOVE_TO_CART } from '../../assets/images';

interface ProductItemProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

const ProductItem = ({ id, imageUrl, name, price }: ProductItemProps) => {
  const { cartItems, addCart, deleteCart } = useCart();
  const [isInCart, setIsInCart] = useState(false);

  const cartItem = cartItems.find(({ product }) => id === product.id);

  useEffect(() => {
    if (cartItem) {
      setIsInCart(true);
    }
  }, [cartItems]);

  const TOGGLE_BUTTON_ICON = isInCart ? REMOVE_TO_CART : ADD_TO_CART;
  const BUTTON_TEXT = isInCart ? '빼기' : '담기';

  const handleOnToggle = () => {
    if (cartItem && isInCart) {
      deleteCart(cartItem.id);
      setIsInCart(false);
    } else {
      addCart(id);
      setIsInCart(true);
    }
  };

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
            <S.ButtonImage src={TOGGLE_BUTTON_ICON} />
            <span>{BUTTON_TEXT}</span>
          </S.ToggleButton>
        </S.ButtonContainer>
      </S.InformationContainer>
    </S.ProductItem>
  );
};

export default ProductItem;
