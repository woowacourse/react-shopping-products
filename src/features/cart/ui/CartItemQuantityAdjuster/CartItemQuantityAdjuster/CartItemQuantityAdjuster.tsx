import { Text } from '@/shared';

import { UpdateCartItemQuantityButton } from '../UpdateCartItemQuantityButton/UpdateCartItemQuantityButton';

import css from './CartItemQuantityAdjuster.module.css';

interface CartItemQuantityAdjusterProps {
  id: number;
  quantity: number;
}

export const CartItemQuantityAdjuster = ({ id, quantity }: CartItemQuantityAdjusterProps) => {
  return (
    <div className={css.root}>
      <UpdateCartItemQuantityButton cartItemId={id} type={'decrease'} />
      <Text tag={'span'} type={'b1'} className={css.text}>
        {quantity}
      </Text>
      <UpdateCartItemQuantityButton cartItemId={id} type={'increase'} />
    </div>
  );
};
