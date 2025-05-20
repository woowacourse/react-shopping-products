import { Price, PriceContainer, PriceText } from "./TotalPrice.css";

function TotalPrice() {
  return (
    <div css={PriceContainer}>
      <p css={PriceText}>총 결제 금액</p>
      <p css={Price}>95,000원</p>
    </div>
  );
}
export default TotalPrice;
