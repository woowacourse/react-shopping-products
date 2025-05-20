import { css } from '@emotion/react';
import { CartItem } from '../../page/ShopPage';
import Button from '../Button/Button';
import { useCartItemToggle } from '../../hook/useCartItemToggle';

interface ProductProps {
  id: string;
  imageUrl: string;
  name: string;
  price: string;
  selectedCardItems: CartItem[];
  onChange: () => void;
}

const productLayout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 8px;
  border-radius: 8px;
  width: 182px;
  height: 224px;
  gap: 15px;
`;

const imgLayout = css`
  border-radius: 8px 8px 0 0;
  width: 100%;
  height: 50%;
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

export default function Product({ id, imageUrl, name, price, selectedCardItems, onChange }: ProductProps) {
  const { isSelected, toggle } = useCartItemToggle({
    productId: Number(id),
    selectedCartItem: selectedCardItems[0],
    onSuccess: onChange,
  });

  const addProduct = () => (
    <Button onClick={toggle}>
      <img src="./add-shopping-cart.svg" />
      <p>담기</p>
    </Button>
  );

  const removeProduct = () => (
    <Button onClick={toggle} style="secondary">
      <img src="./remove-shopping-cart.svg" />
      <p>빼기</p>
    </Button>
  );

  return (
    <div id={id} css={productLayout}>
      <img css={imgLayout} src={imageUrl ?? './default-img.png'} />
      <div css={contentLayout}>
        <div css={descriptionLayout}>
          <p css={productNameLayout}>{name}</p>
          <p css={priceLayout}>{price}</p>
        </div>
        {isSelected ? removeProduct() : addProduct()}
      </div>
    </div>
  );
}
