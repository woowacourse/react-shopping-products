import { css } from '@emotion/css';
import Button from '../common/Button/Button';
import { ActionType } from '../../types/product';

const quantitySpan = css`
  padding: 0px 7px;
`;

type CartItemCountButtonsProps = {
  quantity: number;
} & ActionType;

function CartItemCountButtons({ quantity, onClickModifyCartItem }: CartItemCountButtonsProps) {
  const buttonStyle = { width: '24px', height: '24px', border: '1px solid rgb(0, 0, 0, 0.1)' };

  return (
    <>
      <Button
        radius={'8px'}
        style={buttonStyle}
        onClick={() => onClickModifyCartItem(quantity - 1)}
      >
        -
      </Button>
      <span className={quantitySpan}>{quantity}</span>
      <Button
        radius={'8px'}
        style={buttonStyle}
        onClick={() => onClickModifyCartItem(quantity + 1)}
      >
        +
      </Button>
    </>
  );
}

export default CartItemCountButtons;
