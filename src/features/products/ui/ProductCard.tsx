/** @jsxImportSource @emotion/react */
import CustomButton from '../../../shared/ui/CustomButton';
import * as S from './ProductCard.styles';
import CartQuantitySelector from './CartQuantitySelector';
import { useProductsWithCartContext } from '../../../shared/contexts/productsWithCart/useProductsWithCartContext';
import { Product } from '../../../shared/contexts/productsWithCart/types';

interface ProductCardProps {
  product: Product;
  setError: (error: string) => void;
}

export default function ProductCard({ product, setError }: ProductCardProps) {
  const { toggleCartSelection, selectedProductIds } = useProductsWithCartContext();

  const isCartSelected = selectedProductIds.includes(product.id);

  const handleProductCart = () => {
    toggleCartSelection(product.id);
  };

  const cartProductId = product.cartProductId ?? -1;
  const cartProductQuantity = product.cartProductQuantity || 1;

  const isProductSoldOut: boolean =
    product.cartProductQuantity !== undefined && product.cartProductQuantity >= product.quantity;

  return (
    <S.ProductCardContainer data-testid='product-card'>
      <S.ImageWrapper>
        <S.ImageSection
          src={product.imageUrl}
          alt={product.name}
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null;
            target.src = './default-product.jpg';
          }}
        />
        {isProductSoldOut && <S.SoldOutOverlay>품절</S.SoldOutOverlay>}
      </S.ImageWrapper>
      <S.ContentSection>
        <S.ProductName>{product.name}</S.ProductName>
        <S.ProductCategory>{product.category}</S.ProductCategory>
        <S.ProductPrice data-testid='product-price'>{product.price}</S.ProductPrice>
        <S.ProductQuantity>재고: {product.quantity}</S.ProductQuantity>
      </S.ContentSection>
      <S.ButtonSection>
        {!isCartSelected ? (
          <CustomButton onClick={handleProductCart} disabled={isProductSoldOut} />
        ) : (
          <CartQuantitySelector
            productId={product.id}
            cartProductId={cartProductId}
            cartProductQuantity={cartProductQuantity}
            setError={setError}
            isProductSoldOut={isProductSoldOut}
          />
        )}
      </S.ButtonSection>
    </S.ProductCardContainer>
  );
}
