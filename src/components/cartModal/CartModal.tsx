import Modal from '../@common/modal/Modal';
import CartItem from '../cartItem/CartItem';
import type { CartItemType } from '../../types/data';
import useDataContext from '../../hooks/useDataContext';

interface CartModalProps {
  isCartModalOpen: boolean;
  onModalClose: () => void;
  onAddCartItem: (productId: number) => void;
  onRemoveCartItem: (productId: number) => void;
  onUpdateCartItem: (productId: number, quantity: number) => void;
}

const CartModal = (props: CartModalProps) => {
  const { isCartModalOpen, onModalClose, onAddCartItem, onRemoveCartItem, onUpdateCartItem } =
    props;
  const { cartItemsResource } = useDataContext();

  return (
    <Modal isOpen={isCartModalOpen} onClose={onModalClose} title="장바구니">
      {cartItemsResource.data?.map((cartItem: CartItemType) => (
        <CartItem
          key={cartItem.product.id}
          cartItem={cartItem}
          onAddCartItem={onAddCartItem}
          onRemoveCartItem={onRemoveCartItem}
          onUpdateCartItem={onUpdateCartItem}
        />
      ))}
    </Modal>
  );
};

export default CartModal;
