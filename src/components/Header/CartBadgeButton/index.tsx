import { CartIcon } from '@assets/index';
import CartListModal from '@components/CartListModal';
import { useOpenModal } from '@hooks/index';
import { lazy, Suspense } from 'react';

const CartQuantity = lazy(() => import('../CartQuantity'));

interface CartActionButtonProps {
  // TODO : 삭제 (장바구니 받아오는 것으로, CartListModal에 props로 전달)
  cartItemsLength: number;
}
import style from './style.module.css';

const CartBadgeButton = ({ cartItemsLength }: CartActionButtonProps) => {
  const quantityClassName = `${style.quantity} ${cartItemsLength > BADGE_MAX_QUANTITY ? style.over : ''}`;
const CartBadgeButton = () => {
  const { openModal, setOpenModal, rootEl } = useOpenModal({ isOpenModal: false });

  const handleClickButton = () => {
    setOpenModal(true);
  };

  return (
    <>
      <button type="button" className={style.button} onClick={handleClickButton}>
        <img src={CartIcon} alt="장바구니 아이콘(장바구니 목록 열기)" />
        {!!cartItemsLength && (
          <div className={quantityClassName}>
            {cartItemsLength > BADGE_MAX_QUANTITY ? BADGE_MAX_QUANTITY : cartItemsLength}
          </div>
        )}
      </button>
      <CartListModal openModal={openModal} setOpenModal={setOpenModal} rootEl={rootEl} />
    </>
  );
};

export default CartBadgeButton;
