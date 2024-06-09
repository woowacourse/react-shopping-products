import MinusButtonIcon from '../../../assets/MinusButtonIcon.png';
import PlusButtonIcon from '../../../assets/PlusButtonIcon.png';
import Button from '../../../components/Button/Button';
import { useChangeQuantity } from '../../../hooks/useChangeQuantity';
import { CartItemType } from '../../../types';
import styles from '../ProductListPage.module.css';

interface Props {
  cartItem: CartItemType;
}

const ProductQuantity = ({ cartItem }: Props) => {
  const { id, quantity } = cartItem;
  const { handleIncreaseQuantity, handleDecreaseQuantity } = useChangeQuantity();

  return (
    <div className={styles.productQuantityContainer}>
      <Button onClick={() => handleDecreaseQuantity(id, quantity)} iconSrc={MinusButtonIcon} />
      <p>{quantity}</p>
      <Button onClick={() => handleIncreaseQuantity(id, quantity)} iconSrc={PlusButtonIcon} />
    </div>
  );
};

export default ProductQuantity;
