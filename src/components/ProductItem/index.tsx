import * as S from './style';

import { ADD_TO_CART, REMOVE_TO_CART } from '../../assets/images';

interface ProductItemProps {
  isInCart: boolean;
  imageUrl: string;
  name: string;
  price: number;
}

const ProductItem = ({ isInCart, imageUrl, name, price }: ProductItemProps) => {
  const TOGGLE_BUTTON_ICON = isInCart ? REMOVE_TO_CART : ADD_TO_CART;
  const BUTTON_TEXT = isInCart ? '담기' : '빼기';

  const onClick = () => console.log('click toggle button');

  return (
    <S.ProductItem>
      <S.Image src={imageUrl} alt={name + '상품 사진'} />
      <S.InformationContainer>
        <S.Information>
          <S.Name>{name}</S.Name>
          <S.Price>{price.toLocaleString('ko-KR')}원</S.Price>
        </S.Information>
        <S.ButtonContainer>
          <S.ToggleButton onClick={onClick} $isInCart={isInCart}>
            <S.ButtonImage src={TOGGLE_BUTTON_ICON} />
            <span>{BUTTON_TEXT}</span>
          </S.ToggleButton>
        </S.ButtonContainer>
      </S.InformationContainer>
    </S.ProductItem>
  );
};

export default ProductItem;
