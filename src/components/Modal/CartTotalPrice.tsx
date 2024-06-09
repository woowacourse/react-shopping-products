import {
  AmountContainer,
  AmountDetails,
  AmountDetailsTitle,
  AmountDetailsPrice,
} from "./CartTotalPrice.styled";

export const CartTotalPrice = ({ cartItems }: { cartItems: Cart[] }) => {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <AmountContainer>
      <AmountDetails>
        <AmountDetailsTitle>총 결제 금액</AmountDetailsTitle>
        <AmountDetailsPrice>{totalPrice.toLocaleString()}원</AmountDetailsPrice>
      </AmountDetails>
    </AmountContainer>
  );
};
