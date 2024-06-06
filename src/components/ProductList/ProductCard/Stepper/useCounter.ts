import React, { useCallback, useState } from 'react';

const useCounter = (defaultCount = 0) => {
  const [counter, setCounter] = useState(defaultCount);
  const increase = useCallback(() => setCounter(counter + 1), [counter]);
  const decrease = useCallback(() => setCounter(counter - 1), [counter]);
  return { counter, setCounter, increase, decrease };
};

export default useCounter;
