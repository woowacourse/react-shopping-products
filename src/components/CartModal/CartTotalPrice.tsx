import { css } from "@emotion/css";

interface CartTotalPriceProps {
  totalPrice: number;
}

const CartTotalPrice = ({ totalPrice }: CartTotalPriceProps) => {
  return (
    <div className={totalPriceStyles}>
      <hr className={hrStyles} />
      <div className={contentStyles}>
        <div className={totalPriceTextStyles}>총 결제 금액</div>
        <div className={totalPriceValueStyles}>
          {totalPrice.toLocaleString()}원
        </div>
      </div>
    </div>
  );
};

export default CartTotalPrice;

const totalPriceStyles = css`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const hrStyles = css`
  border: 1px solid #e5e5e5;
`;

const contentStyles = css`
  display: flex;
  justify-content: space-between;
  padding: 20px 0 0 0;
`;
const totalPriceTextStyles = css`
  font-size: 18px;
  font-weight: 700;
`;
const totalPriceValueStyles = css`
  font-size: 24px;
  font-weight: 700;
`;
