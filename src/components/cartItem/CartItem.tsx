import * as Styled from './CartItem.styled';
import CountButtonContainer from '../countButtonContainer/CountButtonContainer';

import { CartItemInfo } from '@/types/cartItem';
import { koMoneyFormat } from '@/utils/koMoneyFormat';

import useCartItems from '@/hooks/useCartItems';

interface Props {
  item: CartItemInfo;
}

const CartItem = ({ item }: Props) => {
  const { handleDeleteCartItem } = useCartItems();

  return (
    <Styled.itemWrapper>
      <Styled.itemBody>
        <Styled.image src={item.product.imageUrl} width={80} height={80} />
        <Styled.itemContentWrapper>
          <Styled.productName>{item.product.name}</Styled.productName>
          <Styled.price>{koMoneyFormat(item.product.price)}</Styled.price>
          <CountButtonContainer item={item} testId={`shopping-cart-${item.product.id}`} />
        </Styled.itemContentWrapper>
      </Styled.itemBody>
      <Styled.deleteButton onClick={() => handleDeleteCartItem(item.product.id)}>
        삭제
      </Styled.deleteButton>
    </Styled.itemWrapper>
  );
};

export default CartItem;
