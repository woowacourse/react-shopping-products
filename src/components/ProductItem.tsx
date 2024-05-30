import { FlexColumn, FlexRow, FlexSpaceBetween } from '@/style/common.style';
import { useEffect, useState } from 'react';

import CartInButton from './button/CartInButton';
import CartOutButton from './button/CartOutButton';
import { Product } from '@/types/product.type';
import Toast from './Toast';
import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';
import useProductSelector from '@/hooks/useProductSelector';

interface Props {
  item: Product;
}

const ProductItem = ({ item }: Props) => {
  const [showToast, setShowToast] = useState(false);
  const { isSelected, error, addCartItem, removeCartItem } = useProductSelector(
    item.id
  );

  useEffect(() => {
    if (error) {
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      <S.ItemCard>
        <S.Img src={item.imageUrl} alt={item.name} />
        <S.InfoWrapper>
          <S.InfoText>
            <S.Title>{item.name}</S.Title>
            <S.Price>{item.price}</S.Price>
          </S.InfoText>
          <S.ButtonWrapper>
            {isSelected ? (
              <CartOutButton onClick={removeCartItem} />
            ) : (
              <CartInButton onClick={addCartItem} />
            )}
          </S.ButtonWrapper>
        </S.InfoWrapper>
      </S.ItemCard>
      {showToast && <Toast message={(error as Error).message} />}
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
