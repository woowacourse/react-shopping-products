import { useCartContext } from '../../contexts/CartContext';
import { useCartManagement } from '../../hooks/useCartManager';
import { useModalClose } from '../../hooks/useModalClose';
import CartItem from './CartItem';
import {
  CloseButton,
  EmptyCart,
  ModalContainer,
  ModalOverlay,
  ModalTitle,
} from './CartModal.style';
import TotalPrice from './TotalPrice';

interface ModalProps {
  onClose: () => void;
}

function CartModal({ onClose }: ModalProps) {
  const { carts, cartItemCount, fetchCarts } = useCartContext();
  const { modifyCartItem, deleteItemFromCart } = useCartManagement({
    cartItemCount,
    carts,
    refetchCarts: fetchCarts,
  });
  const { onClickOverlay } = useModalClose({ closeModal: onClose });
  const price = carts?.reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0);

  return (
    <>
      <div id="modal-overlay" className={ModalOverlay} onClick={onClickOverlay} />
      <div className={ModalContainer}>
        <h2 className={ModalTitle}>장바구니</h2>
        <hr />
        <div>
          {carts && carts.length === 0 ? (
            <div className={EmptyCart}>장바구니에 담긴 상품이 없습니다.</div>
          ) : (
            carts?.map((cart) => (
              <CartItem
                cart={cart}
                modifyCartItem={modifyCartItem}
                deleteItemFromCart={deleteItemFromCart}
              />
            ))
          )}
        </div>
        <TotalPrice price={price} />
        <button className={CloseButton} onClick={onClose}>
          닫기
        </button>
      </div>
    </>
  );
}

export default CartModal;
