import { useQuery } from "@tanstack/react-query";
import * as CL from "./CartList.style";
import { getCartItems } from "../../../api";
import CartItem from "./CartItem/CartItem";

const CartList = () => {
  const {
    isPending,
    error,
    data: cartItems,
  } = useQuery({
    queryKey: ["getCartItems"],
    queryFn: () => getCartItems(),
  });

  console.log(isPending, error, cartItems);

  return (
    <CL.MainContainer>
      {cartItems?.map((cartItem) => (
        <CartItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <CL.TotalPrice>
        <CL.TotalPriceText>총 결제 금액</CL.TotalPriceText>
        <CL.TotalPriceMoney>94,000원</CL.TotalPriceMoney>
      </CL.TotalPrice>
    </CL.MainContainer>
  );
};

export default CartList;
