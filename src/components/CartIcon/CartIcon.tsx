import CartIconImage from '@/assets/Cart.svg';
import ImageBox from '@/components/common/ImageBox/ImageBox';
import styles from './CartIcon.module.css';

export default function CartIcon() {
  return (
    <>
      <div className={styles.container}>
        <ImageBox className={styles.cartIcon} src={CartIconImage} width={32} height={32} />
        <div className={styles.amountContainer}>
          <span className={styles.amount}>2</span>
        </div>
      </div>
    </>
  );
}
