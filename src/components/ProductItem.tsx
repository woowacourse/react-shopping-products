import styled from '@emotion/styled';
import Button from './Button';
import AddShoppingCartIcon from '/public/icon/add-shopping-cart.svg';
import AddIcon from '/public/icon/add-icon.svg';
import SubIcon from '/public/icon/sub-icon.svg';
import { MockProductsType } from '../mocks/dummy';

interface ProductItemProps {
  product: MockProductsType;
  quantityInCart: number;
  handleIncreaseQuantity: (id: number, quantity: number) => void;
  handleDecreaseQuantity: (id: number, quantity: number) => void;
  handleAddCartItem?: (id: number, quantity: number) => void;
  modal?: boolean;
}

const ProductItem = ({
  product,
  quantityInCart,
  handleAddCartItem,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  modal = false,
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
    <ProductItemContainer modal={modal}>
      <SoldOutWrapper isSoldOut={product.quantity === 0}>
        <ProductItemImage
          src={product.imageUrl}
          alt={product.name}
          onError={handleImageError}
          modal={modal}
        />
      </SoldOutWrapper>
      <ProductItemCard modal={modal}>
        <ProductItemInfo modal={modal}>
          <ProductItemTitle>{product.name}</ProductItemTitle>
          <ProductItemPrice>{product.price.toLocaleString()}원</ProductItemPrice>
        </ProductItemInfo>

        {quantityInCart > 0 ? (
          <QuantityController>
            <Button
              type="button"
              id={`add-${product.id}`}
              name="추가"
              variant="smallWhite"
              onClick={() => handleIncreaseQuantity(product.id, quantityInCart + 1)}
            >
              <ControllerIcon src={AddIcon} alt="아이템 수량 추가" />
            </Button>
            {quantityInCart}
            <Button
              type="button"
              id={`subtract-${product.id}`}
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
            id={`start-add-${product.id}`}
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

const ProductItemContainer = styled.div<{ modal: boolean }>`
  display: flex;
  flex-direction: column;
  max-width: 182px;
  width: 100%;
  gap: 8px;
  border-radius: 8px;
  background-color: var(--color-white);

  ${({ modal }) => modal && `flex-direction: row; width: 100%;`}
`;

const SoldOutWrapper = styled.div<{ isSoldOut: boolean }>`
  position: relative;
  height: 50%;

  border-top-right-radius: 8px;
  border-top-left-radius: 8px;

  ${({ isSoldOut }) =>
    isSoldOut &&
    `
      &::after {
        content: '품절';
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-black);
        opacity: 0.7;
        color: var(--color-white);
        font-size: var(--font-size-title);
        font-weight: var(--font-weight-title);
      }
    `}
`;

const ProductItemImage = styled.img<{ modal: boolean }>`
  height: 100%;
  display: block;
  width: 100%;

  ${({ modal }) => modal && `height: 100%; border-radius: 8px;`}
`;

const ProductItemCard = styled.div<{ modal: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 27px;
  margin: 8px;
  align-items: end;

  ${({ modal }) => modal && `gap: 10px`}
`;

const ProductItemInfo = styled.div<{ modal: boolean }>`
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
