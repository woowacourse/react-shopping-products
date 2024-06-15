import * as CL from "./CartList.style";
import CartItem from "./CartItem/CartItem";
import useCartItemsQuery from "../../../hooks/useCartItemsQuery";

const calculateCartAmount = (cartItems: CartItem[] | undefined) => {
  return cartItems?.reduce(
    (amount, cartItem) => amount + cartItem.product.price * cartItem.quantity,
    0
  );
};

const CartList = () => {
  const { isPending, error, cartItems } = useCartItemsQuery();

  const cartAmount = calculateCartAmount(cartItems);

  if (isPending) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>error</div>;
  }
  return (
    <CL.MainContainer>
      {cartItems?.map((cartItem) => (
        <CartItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <CL.TotalPrice>
        <CL.TotalPriceText>총 결제 금액</CL.TotalPriceText>
        <CL.TotalPriceMoney>
          {cartAmount?.toLocaleString()}원
        </CL.TotalPriceMoney>
      </CL.TotalPrice>
    </CL.MainContainer>
  );
};

export default CartList;
