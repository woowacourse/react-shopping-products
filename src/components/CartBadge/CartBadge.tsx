import { useCart } from '../../context/CartContext';
import CartItemModal from '../CartItemModal/CartItemModal';
import Badge from '../common/Badge/Badge';
import { CartBadgeContainer } from './CartBadge.style';
import { PropsWithChildren, useState } from 'react';

const CartBadge: React.FC<PropsWithChildren> = ({ children }) => {
  const { cartItem } = useCart();
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <CartBadgeContainer
        onClick={() => {
          setIsOpenModal(true);
        }}
      >
        <Badge bgColor="#fff" color="#000">
          {cartItem.length}
        </Badge>
        {children}
      </CartBadgeContainer>
      {isOpenModal && <CartItemModal setIsOpenModal={setIsOpenModal} />}
    </>
  );
};

export default CartBadge;
