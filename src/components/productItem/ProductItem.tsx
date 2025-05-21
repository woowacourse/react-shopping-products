import * as S from './ProductItem.styles';
import Button from '../common/button/Button';
import type { ProductItemType } from '../../types/data';
import AddShoppingCartIcon from '/public/icon/add-shopping-cart.svg';
import CounterControl from '../common/counterControl/CounterControl';
import validateCartInCount from '../../validate/validateCartCount';
import useErrorMessageContext from '../../hooks/useErrorMessageContext';
import tryValidation from '../../util/tryValidation';

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

  const { handleErrorMessage } = useErrorMessageContext();

  const handlePlusCount = () => {
    const newCartInCount = cartInCount + 1;

    const isValidateCount = tryValidation(
      () => validateCartInCount(newCartInCount, product.quantity),
      handleErrorMessage,
    );
    if (!isValidateCount) return;

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
