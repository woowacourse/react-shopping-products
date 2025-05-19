interface FilterByValue<T, K extends keyof T> {
  array: T[];
  compare: K;
  value: string;
}

export const filterByValue = <T, K extends keyof T>({
  array,
  compare,
  value,
}: FilterByValue<T, K>): T[] => {
  if (value === '전체') return array;
  return array.filter((a) => a[compare] === value);
};
