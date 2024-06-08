import CartIconImage from '@/assets/Cart.svg';
import ImageBox from '@/components/common/ImageBox/ImageBox';
import styles from './CartIcon.module.css';
import useCartItemList from '@/hooks/cartItem/useCartItemList';
import { useState } from 'react';
import CartItemListModal from '../CartItemListModal/CartItemListModal';
import { useToast } from '@/hooks/useToast';

export default function CartIcon() {
  const { data, getTotalQuantity } = useCartItemList();
  const [isOpen, setIsOpen] = useState(false);
  const { showToast } = useToast();

  const handleModal = () => {
    if (data?.length === 0) {
      showToast(`장바구니에 담긴 상품이 없습니다. 구매할 상품을 담아주세요.`);
      return;
    }

    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className={styles.container} onClick={handleModal}>
        <ImageBox className={styles.cartIcon} src={CartIconImage} width={32} height={32} />
        <div className={styles.amountContainer}>
          <span className={styles.amount}>{getTotalQuantity()}</span>
        </div>
      </div>

      <CartItemListModal isOpen={isOpen} close={handleModal} />
    </>
  );
}
