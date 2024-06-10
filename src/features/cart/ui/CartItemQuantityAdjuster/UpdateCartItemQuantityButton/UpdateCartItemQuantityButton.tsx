import { Text } from '@/shared';

import { useUpdateCartQuantity } from '../../../model/useUpdateCartQuantity';

import css from './UpdateCartItemQuantityButton.module.css';

type Type = 'increase' | 'decrease';

const label: Record<Type, string> = {
  increase: '+',
  decrease: '-',
};

interface UpdateCartItemQuantityButtonProps {
  cartItemId: number;
  type: Type;
}

export const UpdateCartItemQuantityButton = ({ cartItemId, type }: UpdateCartItemQuantityButtonProps) => {
  const handleUpdateQuantity = useUpdateCartQuantity(cartItemId, type);

  return (
    <button className={css.root} onClick={handleUpdateQuantity}>
      <Text tag={'span'} type={'b1'} className={css.text}>
        {label[type]}
      </Text>
    </button>
  );
};
