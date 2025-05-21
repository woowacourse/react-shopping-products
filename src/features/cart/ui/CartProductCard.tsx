import * as S from './CartProductCard.styles';
import { CartProduct } from '../../products/type/product';
import { useProductsWithCartContext } from '../../../shared/contexts/productsWithCart/useProductsWithCartContext';
import CartQuantitySelector from '../../products/ui/CartQuantitySelector';

interface CartProductCardProps {
  cartProduct: CartProduct;
  setErrors: (error: string) => void;
}

export default function CartProductCard({ cartProduct, setErrors }: CartProductCardProps) {
  const { removeFromCart } = useProductsWithCartContext();

  const handleDelete = async () => {
    try {
      await removeFromCart(cartProduct.id, cartProduct.product.id);
    } catch (error) {
      console.error('장바구니 상품 삭제 중 오류 발생:', error);
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
        <S.CartQuantitySelectorContainer>
          <CartQuantitySelector
            productId={cartProduct.product.id}
            cartProductId={cartProduct.id}
            cartProductQuantity={cartProduct.quantity}
            setErrors={setErrors}
          />
        </S.CartQuantitySelectorContainer>
      </S.CartProductDetails>
      <S.DeleteContainer>
        <S.DeleteButton onClick={handleDelete}>삭제</S.DeleteButton>
      </S.DeleteContainer>
    </S.CartProductCardContainer>
  );
}
