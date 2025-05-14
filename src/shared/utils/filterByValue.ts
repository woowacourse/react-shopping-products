interface FilterByValue<T extends {[key: string]: string | number}> {
  array: T[];
  compare: string;
  value: string;
}

export const filterByValue = <T extends {[key: string]: string | number}>({
  array,
  compare,
  value,
}: FilterByValue<T>) => {
  if (value === '전체') return array;
  return array.filter((a) => a[compare] === value);
};
