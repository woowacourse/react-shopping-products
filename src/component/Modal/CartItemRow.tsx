import { css } from '@emotion/react';
import { CartItem } from '../../page/ShopPage';
import Stepper from '../Stepper/Stepper';
import Toast from '../Toast/Toast';
import useCartQuantity from '../../hook/useCartQuantity';
import { deleteCartItem } from '../../api/cartItem';

interface CartItemRowProps {
  item: CartItem;
  onChange: () => void;
}

const cartItemLayout = css`
  display: flex;
  align-items: center;
  position: relative;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
`;

const imageWrapper = css`
  width: 80px;
  height: 80px;
  margin-right: 12px;
  flex-shrink: 0;
`;

const imageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`;

const infoWrapper = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const namePriceRow = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const productName = css`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
`;

const productPrice = css`
  font-size: 14px;
  color: #555;
  margin: 0;
`;

const deleteButton = css`
  position: absolute;
  top: 12px;
  right: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  font-size: 13px;
  padding: 4px 8px;
  cursor: pointer;
`;

export default function CartItemRow({ item, onChange }: CartItemRowProps) {
  const { quantity, showToast, handleIncrease, handleDecrease } = useCartQuantity({
    productId: item.product.id,
    stock: item.product.stock,
    selectedCartItem: item,
    onChange,
  });

  const handleDelete = async () => {
    try {
      await deleteCartItem(item.id);
      onChange();
    } catch (e) {
      alert('삭제에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <div css={cartItemLayout} key={item.id}>
      <div css={imageWrapper}>
        <img css={imageStyle} src={item.product.imageUrl} />
      </div>
      <div css={infoWrapper}>
        <div css={namePriceRow}>
          <p css={productName}>{item.product.name}</p>
          <p css={productPrice}>{item.product.price.toLocaleString()}원</p>
        </div>
        <Stepper quantity={quantity} onIncrease={handleIncrease} onDecrease={handleDecrease} />
      </div>
      <button css={deleteButton} onClick={handleDelete}>
        삭제
      </button>
      {showToast && <Toast>재고 수량을 초과할 수 없습니다.</Toast>}
    </div>
  );
}
