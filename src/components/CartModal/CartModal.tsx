import ItemModalCard from '../ItemModalCard/ItemModalCard';
import S from './CartModal.module.css';

interface ModalProps {
  cartItemData: {
    cartInfo: {
      id: number;
      quantity: number;
    };
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
    quantity: number;
  }[];
  handleCartProducts: (
    keyword: 'add' | 'remove' | 'patch',
    options: {
      id: number;
      quantity?: number;
    }
  ) => Promise<void>;
  handleClose: () => void;
}

const CartModal = ({ cartItemData, handleClose, handleCartProducts }: ModalProps) => {
  const totalPrice = cartItemData.reduce(
    (acc, { cartInfo, price }) => acc + cartInfo.quantity * price,
    0
  );

  return (
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
  );
};

export default CartModal;
