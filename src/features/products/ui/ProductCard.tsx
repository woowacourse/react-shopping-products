import { css } from '@emotion/react';
import CustomButton from '../../../shared/ui/CustomButton';
import { Product } from '../type/product';
import * as S from './ProductCard.styles';
import { useState } from 'react';
import CartQuantitySelector from './CartQuantitySelector';
// import { CART_MAX_LIMIT } from '../../cart/constants/cart';
// import { addCartProduct } from '../../cart/api/addCartProduct';
// import { deleteCartProduct } from '../../cart/api/deleteCartProduct';

interface ProductCardProps {
  product: Product;
  setErrors: (error: string) => void;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isCartSelected, setCartSelected] = useState(false);

  const handleProductCart = async () => {
    setCartSelected((prev) => !prev);
  };

  const buttonStyle = product.isCart
    ? css`
        background-color: #fff;
        color: #000;
        border: 1px solid #000;
      `
    : css``;

  const cartProductId = product.cartProductId ?? -1;

  return (
    <S.ProductCardContainer>
      <S.ImageSection
        src={product.imageUrl}
        alt={product.name}
        onError={(e) => {
          const target = e.currentTarget;
          target.onerror = null;
          target.src = './default-product.jpg';
        }}
      />
      <S.ContentSection>
        <S.ProductName>{product.name}</S.ProductName>
        <S.ProductCategory>{product.category}</S.ProductCategory>
        <S.ProductPrice>{product.price}</S.ProductPrice>
      </S.ContentSection>
      <S.ButtonSection>
        {!isCartSelected ? (
          <CustomButton onClick={handleProductCart} css={buttonStyle} />
        ) : (
          <CartQuantitySelector productId={product.id} cartProductId={cartProductId} />
        )}
      </S.ButtonSection>
    </S.ProductCardContainer>
  );
}
