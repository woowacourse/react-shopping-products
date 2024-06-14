import { useCartItem } from '../../hooks/useCartItem';
import CartItemModal from '../CartItemModal/CartItemModal';
import Badge from '../common/Badge/Badge';
import { CartBadgeContainer } from './CartBadge.style';
import { PropsWithChildren, useState } from 'react';

const CartBadge: React.FC<PropsWithChildren> = ({ children }) => {
  const { cartItems } = useCartItem();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <CartBadgeContainer
        onClick={() => {
          setIsOpenModal(true);
        }}
      >
        <Badge bgColor="#fff" color="#000">
          {cartItems.length}
        </Badge>
        {children}
      </CartBadgeContainer>
      {isOpenModal && <CartItemModal closeModal={closeModal} />}
    </>
  );
};

export default CartBadge;
