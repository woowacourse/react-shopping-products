import { FlexColumn, FlexRow, FlexSpaceBetween } from '@/style/common.style';

import BorderButton from '@/components/button/BorderButton';
import { CartItem } from '@/types/cartItem.type';
import QuantityBox from '@/components/product/QuantityBox';
import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';
import useProductSelector from '@/hooks/useProductSelector';

interface Props {
  item: CartItem;
}

const CartItemBox = ({ item }: Props) => {
  const { product } = item;
  const { quantity, handleDeleteCartItem, handleChangeQuantity } =
    useProductSelector(product.id);

  return (
    <S.ItemWrapper>
      <S.FlexBetweenBox>
        <S.RowBox>
          <S.Img src={product.imageUrl} alt={product.name} />
          <S.ColumnBox>
            <S.ItemName>{product.name}</S.ItemName>
            <S.ItemPrice>{product.price.toLocaleString('ko-KR')}원</S.ItemPrice>
            <QuantityBox
              quantity={quantity}
              handleQuantity={handleChangeQuantity}
            />
          </S.ColumnBox>
        </S.RowBox>
        <BorderButton onClick={handleDeleteCartItem}>삭제</BorderButton>
      </S.FlexBetweenBox>
    </S.ItemWrapper>
  );
};
export default CartItemBox;

const S = {
  ItemWrapper: styled.div`
    ${FlexColumn}
    justify-content: space-around;
    width: 100%;
    height: 120px;
    margin-top: 10px;
    border-top: 1px solid ${theme.color.blackWithOpacity};
    padding: 10px 0;
  `,
  FlexBetweenBox: styled.div`
    ${FlexSpaceBetween}
    align-items: flex-start;
  `,
  RowBox: styled.div`
    ${FlexRow}
    gap: 20px;
  `,
  ColumnBox: styled.div`
    ${FlexColumn}
    gap: 5px;
    margin-top: 10px;
  `,
  Img: styled.img`
    width: 112px;
    height: 112px;
    border-radius: 8px;
  `,
  ItemName: styled.span`
    font-size: ${theme.fontSize.small};
  `,
  ItemPrice: styled.span`
    font-size: ${theme.fontSize.large};
    font-weight: ${theme.fontWeight.bold};
  `,
};
