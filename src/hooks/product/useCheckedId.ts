import { useState } from 'react';

const useCheckedIds = () => {
  const [checkedItemIds, setCheckedItemIds] = useState<number[]>([]);

  const addCheckId = (id: number) => {
    setCheckedItemIds((prevCheckedItemIds) => [...prevCheckedItemIds, id]);
  };

  const removeCheckId = (id: number) => {
    setCheckedItemIds((prevCheckedItemIds) =>
      prevCheckedItemIds.filter((checkedId) => checkedId !== id)
    );
  };

  const toggleId = (id: number) => {
    const isCheckedId = getIsCheckedId(id);

    if (isCheckedId) {
      removeCheckId(id);
      return;
    }

    addCheckId(id);
  };

  const getIsCheckedId = (id: number) => checkedItemIds.includes(id);

  return { toggleId, getIsCheckedId, length: checkedItemIds.length };
};

export default useCheckedIds;
