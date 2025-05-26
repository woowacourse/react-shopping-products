import { css } from '@emotion/react';
import { CartItem } from '../../page/ShopPage';
import Button from '../Button/Button';
import Stepper from '../Stepper/Stepper';
import Toast from '../Toast/Toast';
import useCartQuantity from '../../hook/useCartQuantity';

const productLayout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 8px;
  border-radius: 8px;
  width: 182px;
  height: 224px;
  gap: 15px;
  position: relative;
`;

const imgLayout = css`
  border-radius: 8px 8px 0 0;
  width: 100%;
  height: 100%;
`;

const imgWrapper = css`
  position: relative;
  width: 100%;
  height: 50%;
  border-radius: 8px 8px 0 0;
`;

const soldOutOverlay = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  color: red;
  font-weight: bold;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px 8px 0 0;
`;

const contentLayout = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 27px;
  width: 100%;
  height: 50%;
`;

const descriptionLayout = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
`;

const productNameLayout = css`
  font-size: 14px;
  font-weight: 700;
`;

const priceLayout = css`
  font-size: 12px;
  font-weight: 500;
`;

interface ProductProps {
  id: string;
  imageUrl: string;
  name: string;
  price: string;
  stock: number;
  selectedCardItems: CartItem[];
  onChange: () => void;
}

export default function Product({ id, imageUrl, name, price, stock, selectedCardItems, onChange }: ProductProps) {
  const { quantity, showToast, handleAddToCart, handleIncrease, handleDecrease } = useCartQuantity({
    productId: Number(id),
    stock,
    selectedCartItem: selectedCardItems[0],
    onChange,
  });

  return (
    <div id={id} css={productLayout}>
      <div css={imgWrapper}>
        <img
          css={imgLayout}
          src={imageUrl}
          alt={name}
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null;
            target.src = './default-img.png';
          }}
        />
        {stock === 0 && <div css={soldOutOverlay}>품절</div>}
      </div>
      <div css={contentLayout}>
        <div css={descriptionLayout}>
          <p css={productNameLayout}>{name}</p>
          <p css={priceLayout}>{price}</p>
        </div>

        {quantity === 0 ? (
          <Button onClick={handleAddToCart}>
            <img src="./add-shopping-cart.svg" />
            <p>담기</p>
          </Button>
        ) : (
          <Stepper quantity={quantity} onIncrease={handleIncrease} onDecrease={handleDecrease} />
        )}
      </div>

      {showToast && <Toast>재고 수량을 초과할 수 없습니다.</Toast>}
    </div>
  );
}
