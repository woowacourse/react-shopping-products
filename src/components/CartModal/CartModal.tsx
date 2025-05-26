import { Modal } from '@sanghee01/modal';
import useGetCarts from '../../hooks/useGetCartItems';
import useCartManagement from '../../hooks/useCartManagement';
import QuantityControlBox from '../QuantityControlBox/QuantityControlBox';
import DeleteButton from '../DeleteButton/DeleteButton';
import { getImageUrl } from '../../utils/getImageUrl';
import {
  cartModalContent,
  cartItem,
  cartItemInfo,
  cartItemImage,
  cartItemName,
  cartItemPrice,
  cartItemControls,
  totalPrice,
  totalLabel,
  totalAmount,
  emptyCart,
  cartModalContainer,
  closeButton,
  cartItemContent,
  cartItemInfoContainer,
} from './CartModal.style';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CartModal({ isOpen, onClose }: CartModalProps) {
  const { carts, refetchCarts } = useGetCarts();
  const { handleUpdateCartItem, handleDeleteCartItem } = useCartManagement({
    refetchCarts,
    carts,
  });

  const totalAmountValue =
    carts?.reduce((sum, cart) => sum + cart.product.price * cart.quantity, 0) || 0;

  const handleQuantityChange = async (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      await handleDeleteCartItem({ productId });
    } else {
      await handleUpdateCartItem({ productId, quantity: newQuantity });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} position="bottom" size="large">
      <div className={cartModalContainer}>
        <Modal.Header title="장바구니" showCloseButton={false} />
        <Modal.Content>
          <div className={cartModalContent}>
            {!carts || carts.length === 0 ? (
              <div className={emptyCart}>장바구니가 비어있습니다.</div>
            ) : (
              <>
                {carts.map((cart) => (
                  <div key={cart.id} className={cartItem}>
                    <div className={cartItemContent}>
                      <img
                        src={getImageUrl(cart.product.imageUrl)}
                        alt={cart.product.name}
                        className={cartItemImage}
                      />
                      <div className={cartItemInfoContainer}>
                        <div className={cartItemInfo}>
                          <div className={cartItemName}>{cart.product.name}</div>
                          <div className={cartItemPrice}>
                            {cart.product.price.toLocaleString()}원
                          </div>
                        </div>
                        <div className={cartItemControls}>
                          <QuantityControlBox
                            handleDecreaseQuantity={() =>
                              handleQuantityChange(cart.product.id, cart.quantity - 1)
                            }
                            handleIncreaseQuantity={() =>
                              handleQuantityChange(cart.product.id, cart.quantity + 1)
                            }
                            isOutOfStock={false}
                            selectedQuantity={cart.quantity}
                            quantity={cart.product.quantity}
                          />
                        </div>
                      </div>
                    </div>
                    <DeleteButton
                      onClick={() => handleDeleteCartItem({ productId: cart.product.id })}
                    />
                  </div>
                ))}
                <div className={totalPrice}>
                  <span className={totalLabel}>총 결제 금액</span>
                  <span className={totalAmount}>{totalAmountValue.toLocaleString()}원</span>
                </div>
              </>
            )}
          </div>
        </Modal.Content>
        <Modal.Footer>
          <button className={closeButton} onClick={onClose}>
            닫기
          </button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

export default CartModal;
