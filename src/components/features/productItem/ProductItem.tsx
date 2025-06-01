import * as S from './ProductItem.styles';
import Button from '../../@common/button/Button';
import type { ProductItemType } from '../../../types/data';
import AddShoppingCartIcon from '/public/icon/add-shopping-cart.svg';
import CounterControl from '../../@common/counterControl/CounterControl';
import { CLIENT_ERROR_MESSAGE } from '../../../constants/errorMessages';
import useCartCount from '../../../hooks/features/useCartCount';
import { handleImageError } from '../../../util/handleImageError';
interface ProductItemProps {
  cartInCount: number;
  product: ProductItemType;
  onAddCartItem: (productId: number) => void;
  onRemoveCartItem: (productId: number) => void;
  onUpdateCartItem: (productId: number, quantity: number) => void;
}

const ProductItem = ({
  cartInCount,
  product,
  onAddCartItem,
  onRemoveCartItem,
  onUpdateCartItem,
}: ProductItemProps) => {
  const isMaxCountReached = cartInCount >= product.quantity;
  const isOutOfStock = product.quantity === 0;

  const { handlePlusCount, handleMinusCount } = useCartCount({
    cartInCount,
    product,
    onUpdateCartItem,
    onAddCartItem,
    onRemoveCartItem,
  });

  return (
    <S.ProductItemContainer>
      <S.ProductItemImageContainer>
        <S.ProductItemImage
          src={product.imageUrl}
          onError={handleImageError}
          alt={`${product.name} 사진`}
        />
        {isOutOfStock && <S.ProductItemOutOfStockOverlay>품 절</S.ProductItemOutOfStockOverlay>}
      </S.ProductItemImageContainer>
      <S.ProductItemCard>
        <S.ProductItemInfo>
          <S.ProductItemTitle data-testid="product-name">{product.name}</S.ProductItemTitle>
          <S.ProductItemPrice>{product.price.toLocaleString()}원</S.ProductItemPrice>
          {isMaxCountReached && !isOutOfStock && (
            <S.OutOfStockText>{CLIENT_ERROR_MESSAGE.OUT_OF_STOCK}</S.OutOfStockText>
          )}
        </S.ProductItemInfo>

        {cartInCount > 0 ? (
          <CounterControl
            count={cartInCount}
            maxCount={product.quantity}
            onPlusCount={handlePlusCount}
            onMinusCount={handleMinusCount}
          />
        ) : (
          <Button
            type="button"
            id="add"
            name="담기"
            size="small"
            color="black"
            onClick={handlePlusCount}
            disabled={isOutOfStock}
          >
            <S.CartIconContainer>
              <S.CartAddIcon src={AddShoppingCartIcon} alt="장바구니 담기" />
              담기
            </S.CartIconContainer>
          </Button>
        )}
      </S.ProductItemCard>
    </S.ProductItemContainer>
  );
};

export default ProductItem;
