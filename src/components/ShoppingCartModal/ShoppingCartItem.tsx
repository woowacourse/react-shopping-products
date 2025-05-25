import { css } from '@emotion/css';
import { CartItem } from '../../types/cart.type';
import QuantitySpinner from '../Button/QuantitySpinner';
import { useShoppingCart } from '../../hooks/useShoppingCart';

const ShoppingCartItem = ({ cartItem }: { cartItem: CartItem }) => {
  const { product, quantity } = cartItem;
  const { remove, update } = useShoppingCart();

  return (
    <div className={ShoppingCartItemStyles}>
      <img
        src={product.imageUrl || './default.png'}
        alt={product.name}
        className={ShoppingCartItemImage}
        onError={(e) => {
          e.currentTarget.src = './default.png';
        }}
      />
      <div className={ShoppingCartItemInfo}>
        <p className={ShoppingCartItemName}>{product.name}</p>
        <p className={ShoppingCartItemPrice}>
          {product.price.toLocaleString()}원
        </p>
        <QuantitySpinner
          quantity={quantity}
          handleDelete={() => remove(cartItem.id)}
          handleIncrease={() => update(cartItem.id, cartItem.quantity + 1)}
          handleDecrease={() => update(cartItem.id, cartItem.quantity - 1)}
        />
      </div>
      <button
        className={DeleteButtonStyles}
        onClick={() => remove(cartItem.id)}
      >
        삭제
      </button>
    </div>
  );
};

export default ShoppingCartItem;

const ShoppingCartItemStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 24px 0;
  border-bottom: 1px solid #e0e0e0;
  gap: 16px;
`;

const ShoppingCartItemImage = css`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
`;

const ShoppingCartItemName = css`
  font-size: 16px;
  font-weight: 700;
`;

const ShoppingCartItemPrice = css`
  font-size: 12px;
  font-weight: 500;
`;

const ShoppingCartItemInfo = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
`;

const DeleteButtonStyles = css`
  background-color: white;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  width: 40px;
  height: 24px;
  cursor: pointer;

  &:hover {
    background-color: #eaeaea;
  }
`;
