import * as Styled from './Card.styled';

import { AddShoppingCartSvg } from '@assets/svg';
import { Product } from '@appTypes/product';
import Stepper from '@components/common/Stepper/Stepper';
import { SyntheticEvent } from 'react';
import { WrongCatPng } from '@assets/png';
import { formatKoreanCurrency } from '@utils/currency';

interface CardProps {
  product: Product;
  isAddedCart: boolean;
  quantity: number;
  addToCart: () => void;
  increaseCartItemQuantity: () => void;
  decreaseCartItemQuantity: () => void;
}

const Card: React.FC<CardProps> = ({
  product,
  isAddedCart,
  quantity,
  addToCart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
}) => {
  return (
    <Styled.CardContainer>
      <Styled.CardImage
        key={`${product.id}/img`}
        src={product.imageUrl}
        alt={product.name}
        onError={(event: SyntheticEvent<HTMLImageElement, Event>) => {
          if (!event.target) return;
          if (!(event.target instanceof HTMLImageElement)) return;
          event.target.src = WrongCatPng;
        }}
      />
      <Styled.CardDescription>
        <Styled.ProductName>{product.name}</Styled.ProductName>
        <p>{`${formatKoreanCurrency(product.price)}`}</p>
        <Styled.CardToggleButtonContainer>
          {isAddedCart ? (
            <Styled.CardToggleButton
              $isAddedCart={isAddedCart}
              onClick={addToCart}
            >
              <AddShoppingCartSvg /> <span>담기</span>
            </Styled.CardToggleButton>
          ) : (
            <Stepper
              handleIncreaseQuantity={increaseCartItemQuantity}
              handleDecreaseQuantity={decreaseCartItemQuantity}
              quantity={quantity}
            />
          )}
        </Styled.CardToggleButtonContainer>
      </Styled.CardDescription>
    </Styled.CardContainer>
  );
};

export default Card;
