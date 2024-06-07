import useCardPriceCalculator from "@/hooks/useCartPrice";

const CartPrice = () => {
  const { calculateItemsPrice } = useCardPriceCalculator();
  const price = calculateItemsPrice();

  return (
    <div>
      <div>총 결제 금액</div>
      <div>{price}</div>
    </div>
  );
};

export default CartPrice;
