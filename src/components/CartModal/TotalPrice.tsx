import { Price, PriceContainer, PriceText } from './TotalPrice.style';

function TotalPrice({ price }: { price: number | undefined }) {
  return (
    <div className={PriceContainer}>
      <p className={PriceText}>총 결제 금액</p>
      <p className={Price}>{Number(price).toLocaleString()}원</p>
    </div>
  );
}
export default TotalPrice;
