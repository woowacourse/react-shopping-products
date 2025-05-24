import { useState } from 'react';
import { CartDataType } from '../../contexts/CartContext';
import CartItemCountButtons from '../CartItemCountButtons/CartItemCountButtons';
import {
  DeleteButton,
  ItemContainer,
  ItemContent,
  ItemInfo,
  ItemPrice,
  ItemTitle,
  ProductImage,
} from './CartItem.style';
import { CartItemParamType } from '../../types/cartItem';

function CartItem({
  cart,
  modifyCartItem,
  deleteItemFromCart,
}: {
  cart: CartDataType;
  modifyCartItem: ({ productId, quantity }: CartItemParamType) => Promise<boolean>;
  deleteItemFromCart: ({ productId }: { productId: number }) => Promise<boolean>;
}) {
  const { id, price, name, imageUrl } = cart.product;
  const [cartQuantity, setCartQuantity] = useState(cart.quantity);

  const handleModifyCartItem = async (quantity: number) => {
    const res = await modifyCartItem({ productId: id, quantity: quantity });

    if (res) {
      setCartQuantity(quantity);
    }
  };

  return (
    <>
      <div className={ItemContainer}>
        <div className={ItemInfo}>
          <img className={ProductImage} src={imageUrl}></img>
          <div className={ItemContent}>
            <h3 className={ItemTitle}>{name}</h3>
            <p className={ItemPrice}>{price}원</p>
            <CartItemCountButtons
              quantity={cartQuantity}
              onClickModifyCartItem={handleModifyCartItem}
            />
          </div>
        </div>
        <button className={DeleteButton} onClick={() => deleteItemFromCart({ productId: id })}>
          삭제
        </button>
      </div>
      <hr />
    </>
  );
}
export default CartItem;
