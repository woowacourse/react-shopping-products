import { Price, PriceContainer, PriceText } from "./TotalPrice.css";

function TotalPrice({ totalPrice }: { totalPrice: number }) {
  return (
    <div css={PriceContainer}>
      <p css={PriceText}>총 결제 금액</p>
      <p css={Price}>{totalPrice.toLocaleString()}원</p>
    </div>
  );
}
export default TotalPrice;
