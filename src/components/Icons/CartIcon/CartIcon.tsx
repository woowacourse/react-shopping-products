import CartIconImage from '@/assets/Cart.svg';
import ImageBox from '@/components/common/ImageBox/ImageBox';
import styles from './CartIcon.module.css';
import { useState } from 'react';
import CartModal from '../../Modal/Cart/CartModal';
import useGetAllCartItemList from '@/hooks/useGetAllCartItemList';

export default function CartIcon() {
  const { allCartItemList } = useGetAllCartItemList();
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div className={styles.container}>
        <ImageBox
          className={styles.cartIcon}
          src={CartIconImage}
          width={32}
          height={32}
          onClick={handleModalOpen}
        />
        <div className={styles.amountContainer}>
          <span className={styles.amount}>{allCartItemList?.length}</span>
        </div>
      </div>
      <CartModal modalOpen={modalOpen} handleModalClose={handleModalClose} />
    </>
  );
}
