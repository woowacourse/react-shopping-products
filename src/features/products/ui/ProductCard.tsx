import {css} from '@emotion/react';
import CustomButton from '../../../shared/ui/CustomButton';
import {deleteCartProduct} from '../../cart/api/deleteCartProduct';
import {postCartProduct} from '../../cart/api/postCartProduct';
import {Product} from '../type/product';
import * as S from './ProductCard.styles';

interface ProductCardProps {
  product: Product;
  onRefetch: () => void;
  cartQuantity: number;
}

const MAX_CART_QUANTITY = 50;

export default function ProductCard({
  product,
  onRefetch,
  cartQuantity,
}: ProductCardProps) {
  const handleProductCart = async () => {
    if (product.isCart && product.cartProductId) {
      await deleteCartProduct(product.cartProductId);
      onRefetch();

      return;
    }

    if (cartQuantity >= MAX_CART_QUANTITY) {
      alert(
        `장바구니에 담을 수 있는 최대 개수는 ${MAX_CART_QUANTITY}개입니다.`
      );
      return;
    }
    await postCartProduct(product.id);
    onRefetch();
  };

  const iconUrl = product.isCart ? './deleteCartIcon.svg' : './addCartIcon.svg';
  const title = product.isCart ? '빼기' : '담기';
  const className = product.isCart
    ? css`
        background-color: #fff;
        color: #000;
        border: 1px solid #000;
      `
    : css``;

  return (
    <S.ProductCardContainer>
      <S.ImageSection
        src={product.imageUrl}
        alt={product.name}
        onError={(e) => (e.currentTarget.src = './emptyImage.jpg')}
      />
      <S.ContentSection>
        <S.ProductName>{product.name}</S.ProductName>
        <S.ProductCategory>{product.category}</S.ProductCategory>
        <S.ProductPrice>{product.price}</S.ProductPrice>
      </S.ContentSection>
      <S.ButtonSection>
        <CustomButton
          iconUrl={iconUrl}
          title={title}
          onClick={handleProductCart}
          css={className}
        />
      </S.ButtonSection>
    </S.ProductCardContainer>
  );
}
