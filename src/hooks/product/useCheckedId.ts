import { useState } from 'react';

const useCheckedIds = () => {
  const [checkedItemIds, setCheckedItemIds] = useState<number[]>([]);

  const checkId = (id: number) => {
    setCheckedItemIds((prev) => {
      if (prev.includes(id)) return prev;
      return prev.concat(id);
    });
  };

  const uncheckId = (id: number) => {
    setCheckedItemIds((prev) => {
      const idIndex = prev.indexOf(id);
      if (idIndex === -1) return prev;

      const next = [...prev];
      next.splice(idIndex, 1);
      return next;
    });
  };

  const toggleId = (id: number) => {
    const isCheckedId = getIsCheckedId(id);
    if (isCheckedId) return uncheckId(id);
    checkId(id);
  };

  const getIsCheckedId = (id: number) => checkedItemIds.includes(id);

  return { toggleId, getIsCheckedId, length: checkedItemIds.length };
};

export default useCheckedIds;
