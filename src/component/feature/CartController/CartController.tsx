import { IconPlus, IconMinus } from '../../../asset';
import {
  cartControllerStyle,
  controlButtonStyle,
} from './CartController.styles';

const CartController = ({
  quantity,
  cartItemId,
  patchCartItemQuantity,
}: {
  quantity: number;
  cartItemId: number;
  patchCartItemQuantity: (cartItemId: number, quantity: number) => void;
}) => {
  return (
    <div css={cartControllerStyle}>
      <button
        css={controlButtonStyle}
        onClick={() => patchCartItemQuantity(cartItemId, quantity - 1)}
      >
        <img src={IconMinus} alt="minus" />
      </button>
      <span>{quantity}</span>
      <button
        css={controlButtonStyle}
        onClick={() => patchCartItemQuantity(cartItemId, quantity + 1)}
      >
        <img src={IconPlus} alt="plus" />
      </button>
    </div>
  );
};

export default CartController;
