import * as S from './style';

import AdjustButtonContainer from '../AdjustButtonContainer';
import AddButton from '../AddButton';
import useCartItems from '../../hooks/useCartItems';

interface ProductItemProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

const ProductItem = ({ id, imageUrl, name, price }: ProductItemProps) => {
  const { getCartItems } = useCartItems();

  const cartItem = getCartItems.data
    ? getCartItems.data.find(({ product }) => id === product.id)
    : undefined;
  const isInCart = !!cartItem;

  return (
    <S.ProductItem>
      <S.Image src={imageUrl} alt={name + '상품 사진'} />
      <S.InformationContainer>
        <S.Information>
          <S.Name>{name}</S.Name>
          <S.Price>{price.toLocaleString('ko-KR')}원</S.Price>
        </S.Information>
        <S.ButtonContainer>
          {isInCart ? <AdjustButtonContainer cartItem={cartItem} /> : <AddButton id={id} />}
        </S.ButtonContainer>
      </S.InformationContainer>
    </S.ProductItem>
  );
};

export default ProductItem;
