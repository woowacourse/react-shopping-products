import { css } from '@emotion/css';
import QuantitySpinner from '../Button/QuantitySpinner';
import AddButton from '../Button/AddButton';
import { Product } from '../ProductCardList/product.type';
import { CartItem } from '../ShoppingCartModal/cart.type';

interface ProductCardProps {
  product: Product;
  cartItem: CartItem | null;
  create: (productId: number) => Promise<void>;
  remove: (cartItemId: number) => Promise<void>;
  update: (cartItemId: number, quantity: number) => Promise<void>;
}

const ProductCard = ({
  product,
  cartItem,
  create,
  remove,
  update,
}: ProductCardProps) => {
  const { id, name, price, imageUrl, quantity } = product;

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
        {(quantity === 0 || (cartItem && cartItem.quantity === quantity)) && (
          <div className={SoldOut}>품절</div>
        )}
      </div>
      <div className={CardInfo}>
        <h4 className={ProductName}>{name}</h4>
        <p>{price.toLocaleString()}원</p>
        <div className={ButtonArea}>
          {cartItem ? (
            <QuantitySpinner
              quantity={cartItem.quantity}
              handleDelete={() => remove(cartItem.id)}
              handleIncrease={() => update(cartItem.id, cartItem.quantity + 1)}
              handleDecrease={() => update(cartItem.id, cartItem.quantity - 1)}
            />
          ) : (
            <AddButton onClick={() => create(id)} />
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
  position: relative;
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

const SoldOut = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 35px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;
