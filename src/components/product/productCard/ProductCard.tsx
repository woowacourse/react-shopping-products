import { PropsWithChildren } from 'react';

import * as Styled from './ProductCard.styled';

import { koMoneyFormat } from '@/utils/koMoneyFormat';

interface ProductCardProp {
  imageUrl: string;
  name: string;
  price: number;
}

const ProductCard = ({ imageUrl, name, price, children }: PropsWithChildren<ProductCardProp>) => {
  return (
    <Styled.ProductCardBox>
      <Styled.ProductCardImgBox>
        <Styled.ProductCardImg src={imageUrl} />
      </Styled.ProductCardImgBox>
      <Styled.ProductCardBody>
        <Styled.ProductInfoBox>
          <Styled.ProductCardName>{name}</Styled.ProductCardName>
          <Styled.ProductCardPrice>{koMoneyFormat(price)}</Styled.ProductCardPrice>
        </Styled.ProductInfoBox>
        <Styled.ProductButtonPosition>{children}</Styled.ProductButtonPosition>
      </Styled.ProductCardBody>
    </Styled.ProductCardBox>
  );
};

export default ProductCard;
