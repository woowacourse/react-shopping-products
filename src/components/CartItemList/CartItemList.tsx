import styled from 'styled-components';
import CartItemCard from '../CartItemCard/CartItemCard';
import { CartItemListProps } from './CartItemList.type';

const CartItemListContainer = styled.ul`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

function CartItemList({ items }: CartItemListProps) {
  return (
    <CartItemListContainer>
      {items.map((product) => {
        return <CartItemCard key={product.product.id} item={product} />;
      })}
    </CartItemListContainer>
  );
}

export default CartItemList;
