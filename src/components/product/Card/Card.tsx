import * as Styled from './Card.styled';

import { AddShoppingCartSvg } from '@assets/svg';
import { Product } from '@appTypes/product';
import Stepper from '@components/common/Stepper/Stepper';
import { formatKoreanCurrency } from '@utils/currency';

interface CardProps {
  product: Product;
  isAddedCart: boolean;
  onToggleCart: () => void;
}

const Card: React.FC<CardProps> = ({ product, isAddedCart, onToggleCart }) => {
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
              onClick={onToggleCart}
            >
              <AddShoppingCartSvg /> <span>담기</span>
            </Styled.CardToggleButton>
          ) : (
            <Stepper
              handleDecreaseQuantity={() => {}}
              handleIncreaseQuantity={() => {}}
              quantity={1}
            />
          )}
        </Styled.CardToggleButtonContainer>
      </Styled.CardDescription>
    </Styled.CardContainer>
  );
};

export default Card;
