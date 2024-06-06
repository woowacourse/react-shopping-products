import React, { useCallback, useState } from 'react';

const useCounter = (defaultCount = 0) => {
  const [count, setCount] = useState(defaultCount);
  const increase = useCallback(() => setCount(count + 1), [count]);
  const decrease = useCallback(() => setCount(count - 1), [count]);
  return { count: count, setCount, increase, decrease };
};

export default useCounter;
