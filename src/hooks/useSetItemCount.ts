import { useEffect, useState } from 'react';
import { cartDataType } from '../types/cartItem';

function useSetItemCount(carts: cartDataType[] | null) {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    if (carts) {
      setItemCount(new Set(carts?.map((cart) => cart.product.id)).size);
    }
  }, [carts]);

  return { itemCount };
}

export default useSetItemCount;
