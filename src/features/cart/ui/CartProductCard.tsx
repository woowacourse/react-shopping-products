import * as S from './CartProductCard.styles';
import { CartProduct } from '../../products/type/product';
import { deleteCartProduct } from '../api/deleteCartProduct';
import { useProductsWithCartContext } from '../../../shared/contexts/productsWithCart/useProductsWithCartContext';

export default function CartProductCard({ cartProduct }: { cartProduct: CartProduct }) {
  const { fetchProducts } = useProductsWithCartContext();
  const handleDelete = async () => {
    try {
      await deleteCartProduct(cartProduct.id);
      await fetchProducts();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error deleting cart product:', error);
      }
    }
  };

  return (
    <S.CartProductCardContainer>
      <S.CartProductImage
        src={cartProduct.product.imageUrl}
        alt={cartProduct.product.name}
        onError={(e) => {
          const target = e.currentTarget;
          target.onerror = null;
          target.src = './default-product.jpg';
        }}
      />
      <S.CartProductDetails>
        <S.CartProductName>{cartProduct.product.name}</S.CartProductName>
        <S.CartProductPrice>{cartProduct.product.price.toLocaleString()}원</S.CartProductPrice>
        <S.CartProductQuantity>수량: {cartProduct.quantity}</S.CartProductQuantity>
      </S.CartProductDetails>
      <S.DeleteContainer>
        <S.DeleteButton onClick={handleDelete}>삭제</S.DeleteButton>
      </S.DeleteContainer>
    </S.CartProductCardContainer>
  );
}
