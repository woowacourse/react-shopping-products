import * as Styled from './CartItem.styled';
import Spinner from '../common/spinner/Spinner';
import CountButtonContainer from '../countButtonContainer/CountButtonContainer';

import useDeleteCartItemQuery from '@/hooks/queries/cartItems/useDeleteCartItemQuery';
import { CartItemInfo } from '@/types/cartItem';
import { koMoneyFormat } from '@/utils/koMoneyFormat';

interface Props {
  cartItem: CartItemInfo;
}

const CartItem = ({ cartItem }: Props) => {
  const { mutate: handleDeleteCartItem, isPending: isDeletePending } = useDeleteCartItemQuery();

  return (
    <Styled.itemWrapper>
      <Styled.itemBody>
        <Styled.image src={cartItem.product.imageUrl} width={80} height={80} />
        <Styled.itemContentWrapper>
          <Styled.productName>{cartItem.product.name}</Styled.productName>
          <Styled.price>{koMoneyFormat(cartItem.product.price)}</Styled.price>
          <CountButtonContainer
            cartItem={cartItem}
            testId={`shopping-cart-${cartItem.product.id}`}
          />
        </Styled.itemContentWrapper>
      </Styled.itemBody>
      <Styled.deleteButton onClick={() => handleDeleteCartItem(cartItem.id)}>
        {isDeletePending ? <Spinner size={25} /> : '삭제'}
      </Styled.deleteButton>
    </Styled.itemWrapper>
  );
};

export default CartItem;
