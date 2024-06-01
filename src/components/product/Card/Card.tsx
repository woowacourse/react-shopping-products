import * as Styled from './Card.styled';

import { AddShoppingCartSvg, RemoveShoppingCartSvg } from '@assets/svg';

import { Product } from '@appTypes/product';
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
          <Styled.CardToggleButton
            $isAddedCart={isAddedCart}
            onClick={onToggleCart}
          >
            {isAddedCart ? (
              <>
                <AddShoppingCartSvg /> <span>담기</span>
              </>
            ) : (
              <>
                <RemoveShoppingCartSvg /> <span>빼기</span>
              </>
            )}
          </Styled.CardToggleButton>
        </Styled.CardToggleButtonContainer>
      </Styled.CardDescription>
    </Styled.CardContainer>
  );
};

export default Card;
