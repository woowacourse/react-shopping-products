import * as S from './ProductItem.styles';
import Button from '../common/button/Button';
import type { ProductItemType } from '../../types/data';
import AddShoppingCartIcon from '/public/icon/add-shopping-cart.svg';
import CounterControl from '../common/counterControl/CounterControl';

interface ProductItemProps {
  product: ProductItemType;
  countInCart: number;
  handleAddCartItem: (productId: number) => void;
  handleRemoveCartItem: (productId: number) => void;
}

const ProductItem = ({
  product,
  countInCart,
  handleAddCartItem,
  handleRemoveCartItem,
}: ProductItemProps) => {
  const DEFAULT_PRODUCT_IMAGE = './default-product.png';

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
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

        {countInCart > 0 ? (
          <CounterControl
            count={countInCart}
            handlePlusCount={() => handleAddCartItem(product.id)}
            handleMinusCount={() => handleRemoveCartItem(product.id)}
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
