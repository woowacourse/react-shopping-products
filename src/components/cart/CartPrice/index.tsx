import useCardPriceCalculator from "@/hooks/useCartPriceCalculator";
import * as S from "@/components/cart/CartPrice/style";
import TextBox from "@/components/_common/TextBox";
import { CartItems } from "@/types/products";

const CartPrice = ({ cartItems }: { cartItems: CartItems[] }) => {
  const { calculateItemsPrice } = useCardPriceCalculator();

  const price = calculateItemsPrice(cartItems);

  return (
    <S.Wrapper>
      <TextBox type="small" text="총 결제 금액" />
      <TextBox type="xLarge" text={`${price.toLocaleString()}원`} />
    </S.Wrapper>
  );
};

export default CartPrice;
