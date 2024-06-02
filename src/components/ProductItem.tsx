import { useEffect, useState } from 'react';

import useProductSelector from '@/hooks/useProductSelector';

import CartInButton from '@/components/button/CartInButton';
import CartOutButton from '@/components/button/CartOutButton';
import Toast from '@/components/Toast';

import { Product } from '@/types/product.type';

import styled from '@emotion/styled';
import theme from '@/style/theme.style';

interface Props {
  item: Product;
}

const ProductItem = ({ item }: Props) => {
  const [showToast, setShowToast] = useState(false);
  const { isSelected, error, addCartItem, removeCartItem } = useProductSelector(
    item.id,
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
        <S.Img src={item.imageUrl} alt="" />
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
    display: flex;
    flex-direction: column;
    width: 182px;
    height: 224px;
    border-radius: 8px;
    box-shadow: 0 0 10px 0 ${theme.color.blackWithOpacity};
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
    font-size: ${theme.fontSize.small};
    font-weight: ${theme.fontWeight.bold};
  `,
  Price: styled.div`
    font-size: ${theme.fontSize.xs};
  `,
  ButtonWrapper: styled.div`
    display: flex;
    justify-content: flex-end;
  `,
};
