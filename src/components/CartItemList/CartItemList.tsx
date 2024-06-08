import CartItemCard from '../CartItemCard/CartItemCard';
import { CartItemListProps } from './CartItemList.type';
import * as S from './CartItemList.style';

function CartItemList({ items }: CartItemListProps) {
  return (
    <S.CartItemListContainer>
      {items.map((product) => {
        return <CartItemCard key={product.product.id} item={product} />;
      })}
    </S.CartItemListContainer>
  );
}

export default CartItemList;
