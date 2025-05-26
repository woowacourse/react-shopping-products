import { useFetchCartItems } from '../../hooks/useFetchCartItems';
import CartAddButton from './CartAddButton';
import CartUpdateButton from './CartUpdateButton';

type CartBottomButtonContainerProps = {
  id: number;
};

const CartBottomButtonContainer = ({ id }: CartBottomButtonContainerProps) => {
  const { data: cartProductsIds } = useFetchCartItems();
  const isInCart = cartProductsIds.some((item) => item.productId === id);

  return <>{isInCart ? <CartUpdateButton id={id} /> : <CartAddButton id={id} />}</>;
};

export default CartBottomButtonContainer;
