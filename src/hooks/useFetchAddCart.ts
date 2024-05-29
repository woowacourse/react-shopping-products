import { useState } from 'react';
import { postAddItems } from '../api/products';

const useFetchAddCart = () => {
  const [cartIdSet, setCartIdSet] = useState<Set<number>>(new Set());

  const patchToAddCart = (id: number) => {
    postAddItems(id);
    const newCartIdSet = new Set(cartIdSet);
    newCartIdSet.add(id);
    setCartIdSet(newCartIdSet);
  };

  const patchToRemoveCart = (id: number) => {
    postAddItems(id);
    const newCartIdSet = new Set(cartIdSet);
    newCartIdSet.delete(id);
    setCartIdSet(newCartIdSet);
  };

  return {
    cartIdSet,
    patchToAddCart,
    patchToRemoveCart,
  };
};

export default useFetchAddCart;
