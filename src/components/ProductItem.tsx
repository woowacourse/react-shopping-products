import styled from '@emotion/styled';
import Button from './Button';
import AddShoppingCartIcon from '/public/icon/add-shopping-cart.svg';
import AddIcon from '/public/icon/add-icon.svg';
import SubIcon from '/public/icon/sub-icon.svg';
import { ProductItemType } from '../types/data';

interface ProductItemProps {
  product: ProductItemType;
  quantityInCart: number;
  handleIncreaseQuantity: (id: number, quantity: number) => void;
  handleDecreaseQuantity: (id: number, quantity: number) => void;
  handleAddCartItem?: (id: number, quantity: number) => void;
}

const ProductItem = ({
  product,
  quantityInCart,
  handleAddCartItem,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
}: ProductItemProps) => {
  const DEFAULT_PRODUCT_IMAGE = './default-product.png';

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
  };

  const handleAddButtonClick = (productId: number, quantity: number) => {
    if (handleAddCartItem) {
      handleAddCartItem(productId, quantity);
    }
  };

  return (
    <ProductItemContainer>
      <ProductItemImage src={product.imageUrl} alt={product.name} onError={handleImageError} />
      <ProductItemCard>
        <ProductItemInfo>
          <ProductItemTitle>{product.name}</ProductItemTitle>
          <ProductItemPrice>{product.price.toLocaleString()}원</ProductItemPrice>
        </ProductItemInfo>

        {quantityInCart > 0 ? (
          <QuantityController>
            <Button
              type="button"
              id="add"
              name="추가"
              variant="smallWhite"
              onClick={() => handleIncreaseQuantity(product.id, quantityInCart + 1)}
            >
              <ControllerIcon src={AddIcon} alt="아이템 수량 추가" />
            </Button>
            {quantityInCart}
            <Button
              type="button"
              id="subtract"
              name="감소"
              variant="smallWhite"
              onClick={() => handleDecreaseQuantity(product.id, quantityInCart - 1)}
            >
              <ControllerIcon src={SubIcon} alt="아이템 수량 감소" />
            </Button>
          </QuantityController>
        ) : (
          <Button
            type="button"
            id="startAdd"
            name="담기"
            variant="smallBlack"
            onClick={() => handleAddButtonClick(product.id, 1)}
          >
            <CartIconContainer>
              <CartAddIcon src={AddShoppingCartIcon} alt="장바구니 담기" />
              담기
            </CartIconContainer>
          </Button>
        )}
      </ProductItemCard>
    </ProductItemContainer>
  );
};

const ProductItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 182px;
  width: 100%;
  gap: 8px;
  border-radius: 8px;
  background-color: var(--color-white);
`;

const ProductItemImage = styled.img`
  height: 50%;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

const ProductItemCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 27px;
  margin: 8px;
  align-items: end;
`;

const ProductItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 6px;
  width: 100%;
`;

const ProductItemTitle = styled.span`
  font-size: var(--font-size-subtitle);
  font-weight: var(--font-weight-subtitle);
  width: 100%;
  text-align: start;
`;

const ProductItemPrice = styled.span`
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-body);
  width: 100%;
`;

const CartIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 2px 0;
`;

const CartAddIcon = styled.img`
  width: 16px;
`;

const QuantityController = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  font-size: var(--font-size-placeholder);
  font-weight: var(--font-size-placeholder);
`;

const ControllerIcon = styled.img`
  width: 12px;
`;

export default ProductItem;
