import styled from '@emotion/styled';
import useCartItems from '../../hooks/useCartItems';
const CartTotalAmount = () => {
  const { cartItems } = useCartItems();
  const total = cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  return (
    <TotalAmountContainer>
      <span>총 결제 금액:</span>
      <span>{total.toLocaleString()}원</span>
    </TotalAmountContainer>
  );
};

export default CartTotalAmount;
const TotalAmountContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 22px;
  font-weight: bold;
  margin-top: 20px;
`;
