import * as Styled from './Card.styled';

import { AddShoppingCartSvg } from '@assets/svg';
import { Product } from '@appTypes/product';
import Stepper from '@components/common/Stepper/Stepper';
import { formatKoreanCurrency } from '@utils/currency';

interface CardProps {
  product: Product;
  isAddedCart: boolean;
  addToCart: (productId: number) => void;
  increaseCartItemQuantity: (productId: number) => void;
  decreaseCartItemQuantity: (productId: number) => void;
  getQuantity: (productId: number) => number;
}

const Card: React.FC<CardProps> = ({
  product,
  isAddedCart,
  addToCart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  getQuantity,
}) => {
  return (
    <Styled.CardContainer>
      <Styled.CardImage src={product.imageUrl} alt={product.name} />
      <Styled.CardDescription>
        <Styled.ProductName>{product.name}</Styled.ProductName>
        <p>{`${formatKoreanCurrency(product.price)}`}</p>
        <Styled.CardToggleButtonContainer>
          {isAddedCart ? (
            <Styled.CardToggleButton
              $isAddedCart={isAddedCart}
              onClick={() => addToCart(product.id)}
            >
              <AddShoppingCartSvg /> <span>담기</span>
            </Styled.CardToggleButton>
          ) : (
            <Stepper
              handleIncreaseQuantity={() =>
                increaseCartItemQuantity(product.id)
              }
              handleDecreaseQuantity={() =>
                decreaseCartItemQuantity(product.id)
              }
              quantity={getQuantity(product.id)}
            />
          )}
        </Styled.CardToggleButtonContainer>
      </Styled.CardDescription>
    </Styled.CardContainer>
  );
};

export default Card;
