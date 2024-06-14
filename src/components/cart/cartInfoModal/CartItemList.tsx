import { CartItemInfo } from '@/types/cartItem';
import CartItem from './CartItem';
import * as Styled from './CartItemList.styled';
import { koMoneyFormat } from '@/utils/koMoneyFormat';

interface CartItemListProp {
  cartItemList?: CartItemInfo[];
  matchCartItem: (productId: number) => CartItemInfo | undefined;
  handleDeleteCartItem: (cartId: number) => void;
  handleAdjustQuantity: (quantity: number, cartItemId: number) => void;
  totalCartItemPrice: number;
}

const CartItemList = ({
  cartItemList,
  handleDeleteCartItem,
  handleAdjustQuantity,
  matchCartItem,
  totalCartItemPrice,
}: CartItemListProp) => {
  return (
    <Styled.CartItemListContainer>
      {cartItemList?.map((cartItem) => {
        return (
          <CartItem
            key={cartItem.product.id}
            cartId={cartItem.id}
            cartItemProduct={cartItem.product}
            handleDeleteCartItem={handleDeleteCartItem}
            handleAdjustQuantity={handleAdjustQuantity}
            matchCartItem={matchCartItem}
          />
        );
      })}

      <Styled.Divider />

      <Styled.TotalPriceBox>
        <Styled.TotalPriceLabel>총 결제 금액</Styled.TotalPriceLabel>
        <Styled.TotalPrice>
          {totalCartItemPrice && koMoneyFormat(totalCartItemPrice)}
        </Styled.TotalPrice>
      </Styled.TotalPriceBox>
    </Styled.CartItemListContainer>
  );
};

export default CartItemList;
