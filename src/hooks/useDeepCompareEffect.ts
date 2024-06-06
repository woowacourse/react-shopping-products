import { useEffect, useRef } from 'react';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ObjectAny = Record<string, any>;
const deepEqual = (obj1: ObjectAny, obj2: ObjectAny) => {
  if (obj1 === obj2) return true;
  if (
    typeof obj1 !== 'object' ||
    obj1 === null ||
    typeof obj2 !== 'object' ||
    obj2 === null
  )
    return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;
  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  for (const key of keys2) {
    if (!keys1.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
};

const useDeepCompareEffect = (
  callback: () => void,
  dependencies: Array<unknown>,
) => {
  const dependenciesRef = useRef(dependencies);
  const isEqual = deepEqual(dependencies, dependenciesRef.current);

  if (!isEqual) {
    dependenciesRef.current = [...dependencies];
  }

  useEffect(() => {
    callback();
  }, [dependenciesRef.current]);
};

export default useDeepCompareEffect;
