import useCartItems from '@/hooks/useCartItems';
import CartItem from './CartItem';
import * as Styled from './CartItemList.styled';
import { koMoneyFormat } from '@/utils/koMoneyFormat';

const CartItemList = () => {
  const { cartItems, deleteCartItemMutation, totalCartItemPrice } = useCartItems();
  return (
    <Styled.CartItemListContainer>
      {cartItems?.map((cartItem) => {
        return (
          <CartItem
            key={cartItem.product.id}
            cartId={cartItem.id}
            productId={cartItem.product.id}
            img={cartItem.product.imageUrl}
            productName={cartItem.product.name}
            productPrice={cartItem.product.price}
            deleteCartItem={deleteCartItemMutation}
          ></CartItem>
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
