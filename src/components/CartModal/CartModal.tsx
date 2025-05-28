import ItemModalCard from '../ItemModalCard/ItemModalCard';
import S from './CartModal.module.css';
import useFetchData from '../../hooks/useFetchData';

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const CartModal = ({ isOpen, handleClose }: ModalProps) => {
  const { mergedData, handleCartProducts } = useFetchData();
  const cartItemData = mergedData.filter(({ cartInfo }) => cartInfo.id !== -1);

  const totalPrice = cartItemData.reduce(
    (acc, { cartInfo, price }) => acc + cartInfo.quantity * price,
    0
  );

  return (
    isOpen && (
      <div className={S.container}>
        <div data-testid="modal-overlay" className={S.overlay} onClick={handleClose} />
        <div className={S.content}>
          <p className={S.title}>장바구니</p>
          <div className={S.cartItemContainer}>
            {cartItemData?.map(({ imageUrl, name, price, cartInfo }) => (
              <ItemModalCard
                imageUrl={imageUrl}
                name={name}
                price={price * cartInfo.quantity}
                quantity={cartInfo.quantity}
                onRemoveCart={() => handleCartProducts('remove', { id: cartInfo.id })}
                onPatchCart={(quantity: number) =>
                  handleCartProducts('patch', { id: cartInfo.id, quantity })
                }
              />
            ))}
          </div>
          <div className={S.totalPriceContainer}>
            <p>총 결제 금액</p>
            <p className={S.price}>{totalPrice.toLocaleString()}원</p>
          </div>
          <button className={S.closeButton} onClick={handleClose}>
            닫기
          </button>
        </div>
      </div>
    )
  );
};

export default CartModal;
