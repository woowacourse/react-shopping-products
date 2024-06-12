import useFetchCartItems from '@/hooks/queries/cartItem/useFetchCartItems';
import useAddCartItem from '@/hooks/queries/cartItem/useAddCartItem';

import CartItemQuantityContainer from '@/components/cartItem/CartItemQuantityContainer';
import CartControlButton from '@/components/button/CartControlButton';

import CartInImg from '@/assets/cartIn.svg?react';

import { Product } from '@/types/product.type';

import { STYLE_THEME } from '@/styles/constants/theme';
import styled from '@emotion/styled';

interface Props {
  productItem: Product;
}

const ProductItem = ({ productItem }: Props) => {
  const { findCartItemByProductId } = useFetchCartItems();
  const { addCartItem, error: postCartItemError } = useAddCartItem();
  return (
    <S.ItemCardContainer>
      <S.Img src={productItem.imageUrl} alt="" />
      <S.InfoWrapper>
        <S.InfoText>
          <S.Title>{productItem.name}</S.Title>
          <S.Price>{productItem.price.toLocaleString('ko-KR')}원</S.Price>
        </S.InfoText>
        <S.ButtonWrapper>
          {findCartItemByProductId(productItem.id) ? (
            <CartItemQuantityContainer
              cartItemId={findCartItemByProductId(productItem.id)?.id as number}
              quantity={
                findCartItemByProductId(productItem.id)?.quantity as number
              }
            />
          ) : (
            <CartControlButton
              $theme="black"
              onClick={() => addCartItem(productItem.id)}
              error={postCartItemError}
            >
              <CartInImg />
              담기
            </CartControlButton>
          )}
        </S.ButtonWrapper>
      </S.InfoWrapper>
    </S.ItemCardContainer>
  );
};

export default ProductItem;

const S = {
  ItemCardContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 224px;
    border-radius: 8px;
    box-shadow: 0 0 10px 0 ${STYLE_THEME.color.blackWithOpacity};
    border-radius: 8px;
  `,
  Img: styled.img`
    height: 112px;
    border-radius: 8px 8px 0 0;
    object-fit: cover;
  `,

  InfoWrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 90px;
    padding: 15px 8px;
  `,
  InfoText: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 38px;
  `,
  Title: styled.div`
    font-size: ${STYLE_THEME.fontSize.small};
    font-weight: ${STYLE_THEME.fontWeight.bold};
  `,
  Price: styled.div`
    font-size: ${STYLE_THEME.fontSize.xs};
  `,
  ButtonWrapper: styled.div`
    display: flex;
    justify-content: flex-end;
  `,
};
