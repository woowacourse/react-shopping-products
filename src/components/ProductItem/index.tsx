import * as S from './style';

import useCartItems from '../../hooks/useCartItems';

import { ADD_TO_CART, REMOVE_TO_CART } from '../../assets/images';

interface ProductItemProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

const ProductItem = ({ id, imageUrl, name, price }: ProductItemProps) => {
  const { cartItems, addCartItem, deleteCartItem } = useCartItems();

  const cartItem = cartItems.find(({ product }) => id === product.id);
  const isInCart = !!cartItem;

  const TOGGLE_BUTTON_ICON = isInCart ? REMOVE_TO_CART : ADD_TO_CART;
  const BUTTON_TEXT = isInCart ? '빼기' : '담기';

  const handleOnToggle = () => {
    if (cartItem) {
      deleteCartItem(cartItem.id);
    } else {
      addCartItem(id);
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
