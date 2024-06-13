import { PropsWithChildren, SyntheticEvent, useState } from 'react';

import * as Styled from './ProductCard.styled';

import { IMAGES } from '@/assets';
import { koMoneyFormat } from '@/utils/koMoneyFormat';

interface ProductCardProp {
  imageUrl: string;
  name: string;
  price: number;
}

const ProductCard = ({ imageUrl, name, price, children }: PropsWithChildren<ProductCardProp>) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleImageLoadError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = IMAGES.NO_IMAGE;
  };

  return (
    <Styled.ProductCardBox>
      <Styled.ProductCardImgBox>
        <Styled.ProductCardImg
          src={imageUrl}
          alt={name}
          onLoad={handleImageLoad}
          onError={handleImageLoadError}
          $isImageLoaded={isImageLoaded}
        />
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
