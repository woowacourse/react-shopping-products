import * as S from './ProductItem.styles';
import Button from '../button/Button';
import type { ProductItemType } from '../../types/data';
import AddShoppingCartIcon from '/public/icon/add-shopping-cart.svg';
import RemoveShoppingCartIcon from '/public/icon/remove-shopping-cart.svg';

interface ProductItemProps {
  product: ProductItemType;
  isCartAdded: boolean;
  handleAddCartItem: (productId: number) => void;
  handleRemoveCartItem: (productId: number) => void;
}

const ProductItem = ({
  product,
  isCartAdded,
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
          <S.ProductItemTitle>{product.name}</S.ProductItemTitle>
          <S.ProductItemPrice>{product.price.toLocaleString()}원</S.ProductItemPrice>
        </S.ProductItemInfo>

        {isCartAdded ? (
          <Button
            type="button"
            id="remove"
            name="빼기"
            variant="smallGrey"
            onClick={() => handleRemoveCartItem(product.id)}
          >
            <S.CartIconContainer>
              <S.CartAddIcon src={RemoveShoppingCartIcon} alt="장바구니 빼기" />
              빼기
            </S.CartIconContainer>
          </Button>
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
