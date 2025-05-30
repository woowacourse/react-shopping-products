import Modal from '../common/modal/Modal';
import CartItem from '../cartItem/CartItem';
import type { CartItemType } from '../../types/data';
import useDataContext from '../../hooks/useDataContext';

interface CartModalProps {
  isCartModalOpen: boolean;
  onModalClose: () => void;
  onAddCartItems: (productId: number) => void;
  onRemoveCartItems: (productId: number) => void;
  onUpdateCartItems: (productId: number, quantity: number) => void;
}

const CartModal = (props: CartModalProps) => {
  const { isCartModalOpen, onModalClose, onAddCartItems, onRemoveCartItems, onUpdateCartItems } =
    props;
  const { cartItemsResource } = useDataContext();
  console.log(cartItemsResource.data);

  return (
    <Modal isOpen={isCartModalOpen} onClose={onModalClose} title="장바구니">
      {cartItemsResource.data?.map((cartItem: CartItemType) => (
        <CartItem
          key={cartItem.product.id}
          cartItem={cartItem}
          onAddCartItems={onAddCartItems}
          onRemoveCartItems={onRemoveCartItems}
          onUpdateCartItems={onUpdateCartItems}
        />
      ))}
    </Modal>
  );
};

export default CartModal;
