import { CartItem } from '../../../types/common';
import * as Dialog from '../../@common/Dialog/Dialog';
import {
  cartContent,
  cartHeader,
  cartItemStyle,
  emptyCartStyle,
  totalPriceStyle,
} from './CartSheet.styles';

interface CartSheetProps {
  cartData: CartItem[];
  handleRemoveCart: (cartId: number) => void;
}

const CartSheet = ({ cartData, handleRemoveCart }: CartSheetProps) => {
  const totalPrice = cartData.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <>
      <Dialog.Overlay />
      <Dialog.Content position="bottom" size="large" css={cartContent}>
        <div css={cartHeader}>
          <h2>장바구니</h2>
          <Dialog.CloseButton>닫기</Dialog.CloseButton>
        </div>

        {cartData.length === 0 ? (
          <div css={emptyCartStyle}>
            <p>장바구니가 비어있습니다.</p>
          </div>
        ) : (
          <>
            <div>
              {cartData.map((item) => (
                <div key={item.id} css={cartItemStyle}>
                  <img src={item.product.imageUrl} alt={item.product.name} />
                  <div>
                    <h3>{item.product.name}</h3>
                    <p>{item.product.price.toLocaleString()}원</p>
                    <p>수량: {item.quantity}개</p>
                  </div>
                  <button
                    onClick={() => {
                      handleRemoveCart(item.product.id);
                    }}
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>

            <div css={totalPriceStyle}>
              <p>총 가격: {totalPrice.toLocaleString()}원</p>
              <button>주문하기</button>
            </div>
          </>
        )}
      </Dialog.Content>
    </>
  );
};

export default CartSheet;
