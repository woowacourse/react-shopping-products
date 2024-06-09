import { FlexColumn, FlexRow, FlexSpaceBetween } from '@/style/common.style';

import CartInButton from '@/components/button/CartInButton';
import { Product } from '@/types/product.type';
import QuantityBox from '@/components/product/QuantityBox';
import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';
import { useEffect } from 'react';
import useErrorContext from '@/hooks/useErrorContext';
import useProductSelector from '@/hooks/useProductSelector';

interface Props {
  item: Product;
}

const ProductItem = ({ item }: Props) => {
  const { id, imageUrl, name, price } = item;
  const {
    isSelected,
    quantity,
    error,
    handleAddCartItem,
    handleChangeQuantity,
  } = useProductSelector(id);

  const { setError } = useErrorContext();

  useEffect(() => {
    if (error) {
      setError(error as Error);
    }
  }, [error, setError]);

  return (
    <>
      <S.ItemCard>
        <S.Img src={imageUrl} alt={`${name}의 이미지`} />
        <S.InfoWrapper>
          <S.InfoText>
            <S.Title>{name}</S.Title>
            <S.Price>{price.toLocaleString('ko-KR')}</S.Price>
          </S.InfoText>
          <S.ButtonWrapper>
            {isSelected ? (
              <QuantityBox
                quantity={quantity}
                handleQuantity={handleChangeQuantity}
              />
            ) : (
              <CartInButton onClick={handleAddCartItem} />
            )}
          </S.ButtonWrapper>
        </S.InfoWrapper>
      </S.ItemCard>
    </>
  );
};

export default ProductItem;

const S = {
  ItemCard: styled.div`
    ${FlexColumn}
    width: 175px;
    height: 225px;
    border-radius: 8px;
    box-shadow: 0 0 10px 0 ${theme.color.blackWithOpacity};
    border-radius: 8px;
  `,
  Img: styled.img`
    width: 175px;
    height: 110px;
    border-radius: 8px 8px 0 0;
    object-fit: cover;
  `,

  InfoWrapper: styled.div`
    ${FlexColumn}
    ${FlexSpaceBetween}
    height: calc(225px - 110px);
    margin-top: 7px;
    padding: 8px;
  `,
  InfoText: styled.div`
    ${FlexColumn}
    ${FlexSpaceBetween}
    height: 40px;
  `,
  Title: styled.div`
    font-size: ${theme.fontSize.small};
    font-weight: ${theme.fontWeight.bold};
  `,
  Price: styled.div`
    font-size: ${theme.fontSize.xsmall};
  `,
  ButtonWrapper: styled.div`
    ${FlexRow}
    justify-content: flex-end;
  `,
};
