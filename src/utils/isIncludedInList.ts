export const isIncludedInList = <T>(value: unknown, list: T[]): boolean => {
  return list.includes(value as T);
};
