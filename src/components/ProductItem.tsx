import CartInButton from './button/CartInButton';
import CartOutButton from './button/CartOutButton';
import { FlexRow } from '@/style/common.style';
import { Product } from '@/types/product.type';
import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';

interface Props {
  item: Product;
  isSelected: boolean;
}

const ProductItem = ({ item, isSelected }: Props) => {
  return (
    <S.ItemCard>
      <S.Img src={item.imageUrl} alt={item.name} />
      <S.InfoWrapper>
        <S.InfoText>
          <S.Title>{item.name}</S.Title>
          <S.Price>{item.price}</S.Price>
        </S.InfoText>
        <S.ButtonWrapper>
          {isSelected ? (
            <CartOutButton onClick={() => {}} />
          ) : (
            <CartInButton onClick={() => {}} />
          )}
        </S.ButtonWrapper>
      </S.InfoWrapper>
    </S.ItemCard>
  );
};

export default ProductItem;

const S = {
  ItemCard: styled.div`
    display: flex;
    flex-direction: column;
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(225px - 110px);
    margin-top: 7px;
    padding: 8px;
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
    font-size: ${theme.fontSize.xsmall};
  `,
  ButtonWrapper: styled.div`
    ${FlexRow}
    justify-content: flex-end;
  `,
};
