import { useFetchCartItems, useRemoveItem } from "../../hooks";
import { formatPrice } from "../../utils/format";
import CartItem from "../CartItem/CartItem";
import * as S from "./CartModalContent.styled";

export const CartModalContent = () => {
  const { mutate: removeItem } = useRemoveItem();
  const { cartItems, isError, isLoading } = useFetchCartItems();

  const handleDelete = async (cartItemId: number) => {
    removeItem({ cartItemId });
  };

  const totalAmount = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  if (isError || isLoading) {
    return;
  }

  return (
    <>
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} onDelete={handleDelete} />
      ))}
      <S.StyledCartTotal>
        <S.StyledCartTotalTitle>총 결제 금액</S.StyledCartTotalTitle>
        <S.StyledCartTotalPrice>{formatPrice(totalAmount())}</S.StyledCartTotalPrice>
      </S.StyledCartTotal>
    </>
  );
};
