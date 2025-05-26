import {
  quantityControlContainer,
  quantityButton,
  quantityDisplay,
} from './QuantityControlBox.style';

type QuantityControlBoxProps = {
  handleDecreaseQuantity: () => void;
  handleIncreaseQuantity: () => void;
  isOutOfStock: boolean;
  selectedQuantity: number;
  quantity: number;
};

function QuantityControlBox({
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  isOutOfStock,
  selectedQuantity,
  quantity,
}: QuantityControlBoxProps) {
  return (
    <div className={quantityControlContainer}>
      <button className={quantityButton} onClick={handleDecreaseQuantity} disabled={isOutOfStock}>
        -
      </button>
      <span className={quantityDisplay}>{selectedQuantity}</span>
      <button
        className={quantityButton}
        onClick={handleIncreaseQuantity}
        disabled={isOutOfStock || selectedQuantity >= quantity}
      >
        +
      </button>
    </div>
  );
}

export default QuantityControlBox;
