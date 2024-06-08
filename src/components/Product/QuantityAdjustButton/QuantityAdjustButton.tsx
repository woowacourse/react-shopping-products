import styles from './quantityAdjustButton.module.css';
import Button from '@/components/common/Button/Button';
import QuantityDecreaseIcon from '@/components/Icons/QuantityDecrease/QuantityDecreaseIcon';
import QuantityIncreaseIcon from '@/components/Icons/QuantityIncreaseIcon/QuantityIncreaseIcon';
import useAdjustCartItemQuantity from '@/hooks/useAdjustCartItemQuantity';

type Props = {
  quantity: number;
  cartItemId: number;
};

export default function QuantityAdjustButton({ quantity, cartItemId }: Props) {
  const { handleAdjustCartItemQuantity } = useAdjustCartItemQuantity();

  return (
    <div className={styles.container}>
      <div>
        <Button
          color="default"
          className={styles.button}
          onClick={() => handleAdjustCartItemQuantity({ cartItemId, quantity: quantity - 1 })}
        >
          <QuantityDecreaseIcon />
        </Button>
      </div>
      <div className={styles.quantity_container}>
        <p className={styles.quantity_text}>{quantity}</p>
      </div>
      <div>
        <Button
          color="default"
          className={styles.button}
          onClick={() => handleAdjustCartItemQuantity({ cartItemId, quantity: quantity + 1 })}
        >
          <QuantityIncreaseIcon />
        </Button>
      </div>
    </div>
  );
}
