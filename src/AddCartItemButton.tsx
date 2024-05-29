import { Dispatch, SetStateAction } from 'react';

import { addCartItem, deleteCartItem, fetchCartItems } from './api/cart';
import { IMAGES } from './assets';
import { CartItemInfo } from './types/cartItem';

interface CartItemButtonProp {
  productId: number;
  cartItems: CartItemInfo[];
  setCartItems: Dispatch<SetStateAction<CartItemInfo[]>>;
}

const AddCartItemButton = ({ productId, cartItems, setCartItems }: CartItemButtonProp) => {
  const matchedCartItem = cartItems.find((cartItem) => cartItem.product.id === productId);

  const handleAddCartItem = async () => {
    if (matchedCartItem) return;

    await addCartItem({ productId });

    // TODO: 추가 또는 삭제할 때 장바구니 데이터를 갱신하는 로직 분리
    const data = await fetchCartItems();
    setCartItems(data);
  };

  const handleDeleteCartItems = async () => {
    if (!matchedCartItem) return;

    const cartItemId = matchedCartItem.id;
    await deleteCartItem(cartItemId);

    const data = await fetchCartItems();
    setCartItems(data);
  };

  return (
    <>
      <button onClick={handleAddCartItem}>
        <img src={IMAGES.ADD_SHOPPING_CART} alt="장바구니에 담기버튼" />
        담기
      </button>
      <button onClick={handleDeleteCartItems}>
        <img src={IMAGES.REMOVE_SHOPPING_CART} alt="장바구니에서 삭제버튼" />
        빼기
      </button>
    </>
  );
};

export default AddCartItemButton;
