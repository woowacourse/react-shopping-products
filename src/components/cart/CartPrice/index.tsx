import useCardPriceCalculator from "@/hooks/useCartPrice";
import * as S from "@/components/cart/CartPrice/style";
import TextBox from "@/components/_common/TextBox";

const CartPrice = () => {
  const { calculateItemsPrice } = useCardPriceCalculator();
  const price = calculateItemsPrice();

  return (
    <S.Wrapper>
      <TextBox type="small" text="총 결제 금액" />
      <TextBox type="xLarge" text={`${price.toLocaleString()}원`} />
    </S.Wrapper>
  );
};

export default CartPrice;
