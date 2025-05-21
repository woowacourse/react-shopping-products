import { Product } from '../../App';
import isValidImageUrl from '../../utils/isValidImageUrl';
import QuantityStepper from '../QuantityStepper';
import CartActionButton from './button/CartActionButton';
import styled from '@emotion/styled';

type ProductItemProps = {
  product: Product;
  cartItemQuantity: number;
  increaseCartItemQuantity: (productId: number) => void;
  decreaseCartItemQuantity: (productId: number) => void;
  isInCart: boolean;
  isCartItemsLoading: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
};

const ProductItem = ({
  product,
  cartItemQuantity,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  isInCart,
  isCartItemsLoading,
  addToCart,
  removeFromCart,
}: ProductItemProps) => {
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
      <ProductItemImage
        src={
          isValidImageUrl(product.imageUrl) ? product.imageUrl : 'fallback.svg'
        }
        alt={product.name}
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
