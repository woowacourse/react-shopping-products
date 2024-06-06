import TotalAmount from "@/components/TotalAmount";
import useHandleCartItem from "@/hooks/useHandleCartItem";
import * as S from "@/components/ShoppingBasket/style";
import CartItemCard from "@/components/CartItemCard";

const ShoppingBasket = () => {
  const { cartItems, totalAmount } = useHandleCartItem();

  return (
    <S.Container>
      <S.CartItemWrapper>
        {cartItems && cartItems.map((cartItem) => <CartItemCard product={cartItem.product} />)}
      </S.CartItemWrapper>
      <S.TotalAmountWrapper>
        <TotalAmount amount={totalAmount()} />
      </S.TotalAmountWrapper>
    </S.Container>
  );
};

export default ShoppingBasket;
