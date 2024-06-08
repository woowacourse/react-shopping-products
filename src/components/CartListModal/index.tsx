import { useGetCartList } from '@hooks/index';
import { BottomModal } from 'badahertz52-react-modules-components';
import { Dispatch, SetStateAction } from 'react';

import CartList from './CartList';
import style from './style.module.css';
import TotalAmount from './TotalAmount';

interface CartListModalProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  rootEl: HTMLElement | null;
}
const CartListModal = ({ openModal, setOpenModal, rootEl }: CartListModalProps) => {
  const { cartListMap, isLoading } = useGetCartList({ refetchOnMount: 'always' });
  const cartList = cartListMap ? Array.from(cartListMap.values()) : undefined;

  const calculateTotalAmount = () => {
    if (!cartList?.length) return 0;

    return cartList.reduce((prev, curr) => prev + curr.quantity * curr.product.price, 0);
  };

  return (
    <BottomModal
      modalTargetEl={rootEl}
      openModal={openModal}
      closeModal={() => setOpenModal(false)}
      animationDuration={2000}
    >
      <p className={style.title}>장바구니</p>
      {isLoading ? (
        <>
          <CartList.Skeleton />
          <TotalAmount.Skeleton />
        </>
      ) : (
        <>
          <CartList cartList={cartList} />
          <TotalAmount totalAmount={calculateTotalAmount()} />
        </>
      )}

      <BottomModal.CloseButtonWrapper>
        <button className={style.closeButton}>닫기</button>
      </BottomModal.CloseButtonWrapper>
    </BottomModal>
  );
};

export default CartListModal;
