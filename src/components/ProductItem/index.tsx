import { Product } from '../../App';
import useCartItems from '../../hooks/useCartItems';
import isValidImageUrl from '../../utils/isValidImageUrl';
import QuantityStepper from '../QuantityStepper';
import CartActionButton from './button/CartActionButton';
import styled from '@emotion/styled';

type ProductItemProps = {
  product: Product;
  cartItemQuantity: number;
  isInCart: boolean;
};

const ProductItem = ({
  product,
  cartItemQuantity,
  isInCart,
}: ProductItemProps) => {
  const {
    isLoading: isCartItemsLoading,
    addToCart,
    removeFromCart,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
  } = useCartItems();

  const handleClickIncrementButton = () => {
    increaseCartItemQuantity(product.id);
  };

  const handleClickDecrementButton = () => {
    if (cartItemQuantity === 1) {
      removeFromCart(product.id);
      return;
    }
    decreaseCartItemQuantity(product.id);
  };

  return (
    <ProductItemContainer>
      {product.quantity === 0 && <ProductItemSoldOut>품절</ProductItemSoldOut>}
      <ProductItemImage
        src={
          isValidImageUrl(product.imageUrl) ? product.imageUrl : 'fallback.svg'
        }
        alt={product.name}
        onError={(e) => {
          e.currentTarget.src = 'fallback.svg';
        }}
        onLoad={(e) => {
          if (!isValidImageUrl(e.currentTarget.src)) {
            e.currentTarget.src = 'fallback.svg';
          }
        }}
      />
      <ProductItemInfoContainer>
        <TextContainer>
          <ProductItemName>{product.name}</ProductItemName>
          <ProductItemPrice>
            {product.price.toLocaleString()}원
          </ProductItemPrice>
        </TextContainer>

        <ButtonContainer>
          {isInCart ? (
            <QuantityStepper
              quantity={cartItemQuantity}
              onClickDecrementButton={handleClickDecrementButton}
              onClickIncrementButton={handleClickIncrementButton}
            />
          ) : (
            <CartActionButton
              variant="add"
              onClick={() => addToCart(product)}
              isLoading={isCartItemsLoading}
              isSoldOut={product.quantity === 0}
            />
          )}
        </ButtonContainer>
      </ProductItemInfoContainer>
    </ProductItemContainer>
  );
};

export default ProductItem;

const ProductItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 240px;
  border-radius: 8px;
  position: relative;
`;

const ProductItemInfoContainer = styled.div`
  height: 50%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProductItemImage = styled.img`
  height: 50%;
  border-radius: 8px 8px 0px 0px;
`;

const ProductItemSoldOut = styled.p`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  border-radius: 8px 8px 0px 0px;
}`;
const ProductItemName = styled.p`
  font-size: 18px;
  font-weight: 700;
`;

const ProductItemPrice = styled.p`
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
