import { css } from '@emotion/css';
import RemoveButton from '../Button/RemoveButton';
import AddButton from '../Button/AddButton';
import { Product } from '../../types/product.type';
import { useShoppingCart } from '../../hooks/useShoppingCart';
import { useEffect, useState } from 'react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, name, price, imageUrl } = product;
  const { data, add, remove } = useShoppingCart();
  const [cartItemId, setCartItemId] = useState<number | null>(null);

  useEffect(() => {
    setCartItemId(data.find((ci) => ci.product.id === id)?.id ?? null);
  }, [data, id]);

  return (
    <div key={id} className={CardFrame}>
      <div className={ImageFrame}>
        <img
          src={imageUrl || './default.png'}
          alt={name}
          className={CardImage}
          onError={(e) => {
            e.currentTarget.src = './default.png';
          }}
        />
      </div>
      <div className={CardInfo}>
        <h4 className={ProductName}>{name}</h4>
        <p>{price.toLocaleString()}원</p>
        <div className={ButtonArea}>
          {cartItemId ? (
            <RemoveButton onClick={() => remove(cartItemId)} />
          ) : (
            <AddButton onClick={() => add(id)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

const CardFrame = css`
  width: 100%;
  height: 224px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ImageFrame = css`
  width: 182px;
  height: 112px;
`;

const CardImage = css`
  width: 100%;
  height: 100%;
  border: none;
  object-fit: cover;
`;

const CardInfo = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px 8px 8px 8px;
  gap: 8px;
`;

const ProductName = css`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ButtonArea = css`
  display: flex;
  justify-content: flex-end;
`;
