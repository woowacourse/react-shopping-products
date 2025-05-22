import * as S from './ProductItem.styles';
import Button from '../common/button/Button';
import type { ProductItemType } from '../../types/data';
import AddShoppingCartIcon from '/public/icon/add-shopping-cart.svg';
import CounterControl from '../common/counterControl/CounterControl';
import { CLIENT_ERROR_MESSAGE } from '../../constants/errorMessages';

interface ProductItemProps {
  cartInCount: number;
  product: ProductItemType;
  handleAddCartItem: (productId: number) => void;
  handleRemoveCartItem: (productId: number) => void;
  handleUpdateCartItem: (productId: number, quantity: number) => void;
}

// TODO : 품절된 상품일 경우 "최대 구매 수량에 도달했어요" 안보이도록 설정
// TODO : 최대 구매 수량일 경우 버튼 disabled 처리

const ProductItem = ({
  cartInCount,
  product,
  handleAddCartItem,
  handleRemoveCartItem,
  handleUpdateCartItem,
}: ProductItemProps) => {
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const DEFAULT_PRODUCT_IMAGE = './default-product.png';
    event.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
  };

  const isMaxCountReached = cartInCount >= product.quantity;
  const isOutOfStock = product.quantity === 0;

  const handlePlusCount = () => {
    const newCartInCount = cartInCount + 1;

    if (isMaxCountReached) return;
    if (cartInCount > 0) {
      handleUpdateCartItem(product.id, newCartInCount);
      return;
    }
    handleAddCartItem(product.id);
  };

  const handleMinusCount = () => {
    const newCartInCount = cartInCount - 1;
    if (cartInCount !== 1) {
      handleUpdateCartItem(product.id, newCartInCount);
      return;
    }
    handleRemoveCartItem(product.id);
  };

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
            handlePlusCount={handlePlusCount}
            handleMinusCount={handleMinusCount}
          />
        ) : (
          <Button type="button" id="add" name="담기" variant="smallBlack" onClick={handlePlusCount}>
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
