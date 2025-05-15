export const countDistinct = (cartItemsIds: number[]) => {
  return new Set(cartItemsIds).size;
};
