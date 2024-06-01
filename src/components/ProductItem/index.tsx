import * as S from './style';

import { ADD_TO_CART, REMOVE_TO_CART } from '../../assets/images';
import { useContext, useState } from 'react';
import { CartItemsContext } from '../../context/CartItemProvider';

interface ProductItemProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  cartItemId: number | undefined;
}

const ProductItem = ({ id, imageUrl, name, price, cartItemId }: ProductItemProps) => {
  const { addCart, deleteCart } = useContext(CartItemsContext);
  const [loading, setLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(Boolean(cartItemId));

  const TOGGLE_BUTTON_ICON = isInCart ? REMOVE_TO_CART : ADD_TO_CART;
  const BUTTON_TEXT = isInCart ? '빼기' : '담기';

  const onToggle = async () => {
    setLoading(true);
    if (cartItemId) {
      try {
        await deleteCart(cartItemId);
        setIsInCart(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        await addCart(id);
        setIsInCart(true);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
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
          {loading ? (
            <span>loading...</span>
          ) : (
            <S.ToggleButton onClick={onToggle} $isInCart={isInCart}>
              <S.ButtonImage src={TOGGLE_BUTTON_ICON} />
              <span>{BUTTON_TEXT}</span>
            </S.ToggleButton>
          )}
        </S.ButtonContainer>
      </S.InformationContainer>
    </S.ProductItem>
  );
};

export default ProductItem;
