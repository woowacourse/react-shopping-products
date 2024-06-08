import styles from './ChangeQuantity.module.css';
import PLUS from '../../assets/plus.svg';
import MINUS from '../../assets/minus.svg';
import Button from '../common/Button/Button';
import Text from '../common/Text/Text';

export interface ChangeQuantityProps {
  quantity: number;
  decreaseQuantity: () => void;
  increaseQuantity: () => void;
}

const ChangeQuantity = ({ quantity, decreaseQuantity, increaseQuantity }: ChangeQuantityProps) => {
  return (
    <div className={styles.container}>
      <Button
        isSquare
        radius="m"
        size="s"
        color="default"
        onClick={decreaseQuantity}
        aria-label="수량 감소"
      >
        <img src={MINUS} alt="" />
      </Button>
      <div className={styles.quantity}>
        <Text weight="m" size="s">
          {quantity}
        </Text>
      </div>
      <Button
        isSquare
        size="s"
        radius="m"
        color="default"
        onClick={increaseQuantity}
        aria-label="수량 증가"
      >
        <img src={PLUS} alt="" />
      </Button>
    </div>
  );
};

export default ChangeQuantity;
