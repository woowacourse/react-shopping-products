import * as S from './ProductItem.styles';
import Button from '../common/button/Button';
import type { ProductItemType } from '../../types/data';
import AddShoppingCartIcon from '/public/icon/add-shopping-cart.svg';
import CounterControl from '../common/counterControl/CounterControl';

interface ProductItemProps {
  cartInCount: number;
  product: ProductItemType;
  handleAddCartItem: (productId: number) => void;
  handleRemoveCartItem: (productId: number) => void;
  handleUpdateCartItem: (productId: number, quantity: number) => void;
}

const ProductItem = ({
  cartInCount,
  product,
  handleAddCartItem,
  handleRemoveCartItem,
  handleUpdateCartItem,
}: ProductItemProps) => {
  const DEFAULT_PRODUCT_IMAGE = './default-product.png';

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
  };

  // TODO : product 재고보다 많이 넣으려는 경우 품절 처리 및 장바구니 담기 버튼 비활성화
  const handlePlusCount = () => {
    if (cartInCount > 0) {
      handleUpdateCartItem(product.id, cartInCount + 1);
      return;
    }
    handleAddCartItem(product.id);
  };

  const handleMinusCount = () => {
    if (cartInCount !== 1) {
      handleUpdateCartItem(product.id, cartInCount - 1);
      return;
    }
    console.log(cartInCount);
    handleRemoveCartItem(product.id);
  };

  return (
    <S.ProductItemContainer>
      <S.ProductItemImage
        src={product.imageUrl}
        onError={handleImageError}
        alt={`${product.name} 사진`}
      />
      <S.ProductItemCard>
        <S.ProductItemInfo>
          <S.ProductItemTitle data-testid="product-name">{product.name}</S.ProductItemTitle>
          <S.ProductItemPrice>{product.price.toLocaleString()}원</S.ProductItemPrice>
        </S.ProductItemInfo>

        {cartInCount > 0 ? (
          <CounterControl
            count={cartInCount}
            handlePlusCount={handlePlusCount}
            handleMinusCount={handleMinusCount}
          />
        ) : (
          <Button
            type="button"
            id="add"
            name="담기"
            variant="smallBlack"
            onClick={() => handleAddCartItem(product.id)}
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
