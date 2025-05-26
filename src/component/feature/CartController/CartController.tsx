import { IconPlus, IconMinus } from '../../../asset';
import { CartItem } from '../../../types/common';
import {
  cartControllerStyle,
  controlButtonStyle,
} from './CartController.styles';

const CartController = ({
  quantity,
  cartItemInfo,
  patchCartItemQuantity,
}: {
  quantity: number;
  cartItemInfo: CartItem;
  patchCartItemQuantity: (
    cartItemId: number,
    quantity: number,
    productId: number
  ) => void;
}) => {
  return (
    <div css={cartControllerStyle}>
      <button
        css={controlButtonStyle}
        onClick={() =>
          patchCartItemQuantity(
            cartItemInfo.id,
            quantity - 1,
            cartItemInfo.product.id
          )
        }
      >
        <img src={IconMinus} alt="minus" />
      </button>
      <span>{quantity}</span>
      <button
        css={controlButtonStyle}
        onClick={() =>
          patchCartItemQuantity(
            cartItemInfo.id,
            quantity + 1,
            cartItemInfo.product.id
          )
        }
      >
        <img src={IconPlus} alt="plus" />
      </button>
    </div>
  );
};

export default CartController;
