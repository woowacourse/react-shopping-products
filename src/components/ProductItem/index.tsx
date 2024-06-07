import * as S from './style';

import { ADD_TO_CART } from '../../assets/images';

import Spinner from '../common/Spinner';
import Quantity from '../common/Quantity';
import useHandleCartItems from '../../hooks/useHandleCartItems';
import { CartItem } from '../../types/cart';

interface ProductItemProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  cartItem: CartItem | undefined;
}

const ProductItem = ({ id, imageUrl, name, price, cartItem }: ProductItemProps) => {
  const { addCart } = useHandleCartItems();
  const isInCart = !!cartItem;

  const handleOnClickAddButton = () => {
    addCart.mutate(id);
  };

  return (
    <S.ProductItem>
      <S.ImageWrapper>
        <S.Image src={imageUrl} alt={name + '상품 사진'} />
      </S.ImageWrapper>
      <S.InformationContainer>
        <S.Information>
          <S.Name>{name}</S.Name>
          <S.Price>{price.toLocaleString('ko-KR')}원</S.Price>
        </S.Information>
        <S.ButtonContainer>
          <S.ButtonWrapper>
            {addCart.isPending ? (
              <Spinner />
            ) : isInCart ? (
              <Quantity cartId={cartItem.id} quantity={cartItem.quantity} />
            ) : (
              <S.ToggleButton
                disabled={addCart.isPending}
                $loading={addCart.isPending}
                onClick={handleOnClickAddButton}
                $isInCart={isInCart}
              >
                <S.ButtonImage src={ADD_TO_CART} />
                <span>담기</span>
              </S.ToggleButton>
            )}
          </S.ButtonWrapper>
        </S.ButtonContainer>
      </S.InformationContainer>
    </S.ProductItem>
  );
};

export default ProductItem;
