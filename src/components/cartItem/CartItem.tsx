import styled from '@emotion/styled';
import CounterControl from '../common/counterControl/CounterControl';
import type { CartItemType } from '../../types/data';
import useCartCount from '../../hooks/useCartCount';
import useErrorMessageContext from '../../hooks/useErrorMessageContext';

interface CartItemProps {
  cartItem: CartItemType;
  handleAddCartItems: (productId: number) => void;
  handleRemoveCartItems: (productId: number) => void;
  handleUpdateCartItems: (productId: number, quantity: number) => void;
}

const CartItem = ({
  cartItem,
  handleAddCartItems,
  handleRemoveCartItems,
  handleUpdateCartItems,
}: CartItemProps) => {
  const { handlePlusCount, handleMinusCount } = useCartCount({
    cartInCount: cartItem.quantity,
    product: cartItem.product,
    handleUpdateCartItems,
    handleAddCartItems,
    handleRemoveCartItems,
  });

  return (
    <CartItemContainer>
      <CartItemImage src="./default-product.png" />
      <CartItemInfoContainer>
        <CartItemName>{cartItem.product.name}</CartItemName>
        <CartItemPrice>{cartItem.product.price}</CartItemPrice>
        <CounterControl
          count={cartItem.quantity}
          maxCount={cartItem.product.quantity}
          handlePlusCount={handlePlusCount}
          handleMinusCount={handleMinusCount}
        />
      </CartItemInfoContainer>
    </CartItemContainer>
  );
};

const CartItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  border-top: 1px solid var(--color-light-grey);
  border-bottom: 1px solid var(--color-light-grey);
  padding: 8px 0;
`;

const CartItemImage = styled.img`
  width: 80px;
  height: 80px;
`;

const CartItemInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: start;
  width: 100%;
`;

const CartItemName = styled.span`
  font-size: var(--font-size-subtitle);
  font-weight: var(--font-weight-subtitle);
`;

const CartItemPrice = styled.span`
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-body);
`;

export default CartItem;
