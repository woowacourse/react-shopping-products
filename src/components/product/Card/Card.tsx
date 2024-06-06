import * as Styled from './Card.styled';

import { CartItem, Product } from '@appTypes/product';
import { formatKoreanCurrency } from '@utils/currency';

import { AddShoppingCart } from '@assets/svg';
import useAddShoppingCart from '@hooks/cartItem/useAddShoppingCart';
import CartQuantityCounter from '@components/product/CartQuantityCounter/CartQuantityCounter';

interface CardProps {
  cartItems: CartItem[];
  product: Product;
  isAddedCart: boolean;
}

const Card: React.FC<CardProps> = ({ cartItems, product, isAddedCart }) => {
  const { addShoppingCart } = useAddShoppingCart();

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
              onClick={() => addShoppingCart(product.id)}
            >
              <AddShoppingCart /> 담기
            </Styled.CardToggleButton>
          ) : (
            <CartQuantityCounter cartItems={cartItems} product={product} />
          )}
        </Styled.CardToggleButtonContainer>
      </Styled.CardDescription>
    </Styled.CardContainer>
  );
};

export default Card;
