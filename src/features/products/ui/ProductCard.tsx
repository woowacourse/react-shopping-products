import CustomButton from '../../../shared/ui/CustomButton';
import { Product } from '../type/product';
import * as S from './ProductCard.styles';
import CartQuantitySelector from './CartQuantitySelector';
import { useProductsWithCartContext } from '../../../shared/contexts/productsWithCart/useProductsWithCartContext';
import { css } from '@emotion/react';

interface ProductCardProps {
  product: Product;
  setErrors: (error: string) => void;
}

export default function ProductCard({ product, setErrors }: ProductCardProps) {
  const { toggleCartSelection, selectedProductIds } = useProductsWithCartContext();

  const isCartSelected = selectedProductIds.includes(product.id);

  const handleProductCart = () => {
    toggleCartSelection(product.id);
  };

  const buttonStyle = product.isCart
    ? css`
        background-color: #fff;
        color: #000;
        border: 1px solid #000;
      `
    : css``;

  const cartProductId = product.cartProductId ?? -1;
  const cartProductQuantity = product.cartProductQuantity || 1;

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
          <CartQuantitySelector
            productId={product.id}
            cartProductId={cartProductId}
            cartProductQuantity={cartProductQuantity}
            setErrors={setErrors}
          />
        )}
      </S.ButtonSection>
    </S.ProductCardContainer>
  );
}
