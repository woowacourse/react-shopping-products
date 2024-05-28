import { useState } from 'react';

const useFetchAddCart = () => {
  const [cartIdSet, setCartIdSet] = useState<Set<number>>(new Set());

  const toggleIsAdded = (id: number) => {
    if (cartIdSet.has(id)) {
      const newCartIdSet = new Set(cartIdSet);
      newCartIdSet.delete(id);
      setCartIdSet(newCartIdSet);
      return;
    }
    const newCartIdSet = new Set(cartIdSet);
    newCartIdSet.add(id);
    setCartIdSet(newCartIdSet);
  };

  return {
    cartIdSet,
    toggleIsAdded,
  };
};

export default useFetchAddCart;
