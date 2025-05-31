import { IconPlus, IconMinus } from '../../../asset';
import {
  cartControllerStyle,
  controlButtonStyle,
} from './CartController.styles';

const CartController = ({
  quantity,
  onDecreaseCartClick,
  onIncreaseCartClick,
}: {
  quantity: number;
  onDecreaseCartClick: () => void;
  onIncreaseCartClick: () => void;
}) => {
  return (
    <div css={cartControllerStyle}>
      <button css={controlButtonStyle} onClick={onDecreaseCartClick}>
        <img src={IconMinus} alt="minus" />
      </button>
      <span>{quantity}</span>
      <button css={controlButtonStyle} onClick={onIncreaseCartClick}>
        <img src={IconPlus} alt="plus" />
      </button>
    </div>
  );
};

export default CartController;
