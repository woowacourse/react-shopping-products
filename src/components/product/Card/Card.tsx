import * as Styled from './Card.styled';

import { CartItem, Product } from '@appTypes/product';
import { formatKoreanCurrency } from '@utils/currency';

import { AddShoppingCart } from '@assets/svg';
import useAddShoppingCart from '@hooks/cartItem/useAddShoppingCart';
import CartQuantityCounter from '@components/shoppingCart/CartQuantityCounter/CartQuantityCounter';

interface CardProps {
  cartItem: CartItem | null;
  product: Product;
}

const Card: React.FC<CardProps> = ({ cartItem, product }) => {
  const { addShoppingCart } = useAddShoppingCart();

  return (
    <Styled.CardContainer>
      <Styled.CardImage src={product.imageUrl} alt={product.name} />
      <Styled.CardDescription>
        <Styled.ProductName>{product.name}</Styled.ProductName>
        <p>{`${formatKoreanCurrency(product.price)}`}</p>
        <Styled.CardToggleButtonContainer>
          {cartItem ? (
            <CartQuantityCounter cartItem={cartItem} />
          ) : (
            <Styled.CardToggleButton onClick={() => addShoppingCart(product.id)}>
              <AddShoppingCart /> 담기
            </Styled.CardToggleButton>
          )}
        </Styled.CardToggleButtonContainer>
      </Styled.CardDescription>
    </Styled.CardContainer>
  );
};

export default Card;
