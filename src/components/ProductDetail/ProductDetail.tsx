import { useContext } from 'react';
import { Carts } from '../../types/fetch';
import { CartContext } from '../../context/CartContext';

interface ProductDetailProps {
  cartItems: Carts[];
}

function ProductDetail({ cartItems }: ProductDetailProps) {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error('CartContext가 비어있습니다.');
  }
  const {
    addCartItem,
    deleteCartItem,
    // isDeletePending,
    // isDeleteError,
  } = cartContext;
  return (
    <div>
      {cartItems.map((item) => (
        <>123 </>
      ))}
    </div>
  );
}

export default ProductDetail;
