import { css } from '@emotion/react';
import CustomButton from '../../../shared/ui/CustomButton';
import { deleteCartProduct } from '../../cart/api/deleteCartProduct';
import { Product } from '../type/product';
import * as S from './ProductCard.styles';
import { CART_MAX_LIMIT } from '../../cart/constants/cart';
import { addCartProduct } from '../../cart/api/addCartProduct';

interface ProductCardProps {
  product: Product;
  onRefetch: () => void;
  cartQuantity: number;
}

export default function ProductCard({ product, onRefetch, cartQuantity }: ProductCardProps) {
  const handleProductCart = async () => {
    try {
      if (product.isCart && product.cartProductId) {
        await deleteCartProduct(product.cartProductId);
        alert('장바구니에서 삭제되었습니다.');
        onRefetch();

        return;
      }

      if (cartQuantity >= CART_MAX_LIMIT) {
        alert('장바구니에 담을 수 있는 최대 개수는 50개입니다.');
        return;
      }

      if (product.isCart) {
        alert('이미 장바구니에 담긴 상품입니다.');
        return;
      }

      await addCartProduct(product.id);
      alert('장바구니에 담겼습니다.');
      onRefetch();
    } catch (error) {
      if (error instanceof Error) {
        console.error('장바구니 처리 중 에러 발생:', error);
        alert('장바구니 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  const iconUrl = product.isCart ? './deleteCartIcon.svg' : './addCartIcon.svg';
  const title = product.isCart ? '빼기' : '담기';
  const buttonStyle = product.isCart
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
        <CustomButton iconUrl={iconUrl} title={title} onClick={handleProductCart} css={buttonStyle} />
      </S.ButtonSection>
    </S.ProductCardContainer>
  );
}
