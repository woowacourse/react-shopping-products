import { css } from '@emotion/react';
import { CartItem } from '../../page/ShopPage';
import CartItemRow from './CartItemRow';

interface CartModalProps {
  cartItems: CartItem[];
  onChange: () => void;
  onClose: () => void;
}

const backdrop = css`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`;

const modal = css`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: white;
  border-radius: 16px 16px 0 0;
  padding: 24px 16px;
  max-height: 80%;
  overflow-y: auto;
  box-sizing: border-box;
`;

const modalTitle = css`
  font-family: 'Noto Sans KR';
  font-size: 18px;
  color: #000;
`;

const modalTitleLine = css`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 24px 0;
`;

const modalButton = css`
  border-radius: 5px;
  background: #333;
  width: 100%;
  height: 44px;
  font-size: 15px;
  text-align: center;
  color: #fff;
`;

const totalPriceContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  margin-bottom: 24px;
  font-family: 'Noto Sans KR';
  font-size: 16px;
`;

const priceText = css`
  font-weight: bold;
  color: #000;
  font-size: 24px;
`;

export default function CartModal({ cartItems, onClose, onChange }: CartModalProps) {
  const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div css={backdrop} onClick={onClose}>
      <div css={modal} onClick={(e) => e.stopPropagation()}>
        <h3 css={modalTitle}>장바구니</h3>
        <hr css={modalTitleLine} />
        {cartItems.map((item) => (
          <CartItemRow key={item.id} item={item} onChange={onChange} />
        ))}
        <hr css={modalTitleLine} />
        <div css={totalPriceContainer}>
          <strong>총 결제 금액</strong> <p css={priceText}>{totalPrice.toLocaleString()}원</p>
        </div>
        <button css={modalButton} onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}
