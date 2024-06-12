export const productsKeys = {
  all: ['products'] as const,
  byCategoryAndSort: ({
    category,
    sort,
  }: {
    category: string;
    sort: string;
  }) => [...productsKeys.all, category, sort],
};

export const cartKeys = {
  all: ['cart'] as const,
  totalQuantity: () => [...cartKeys.all, 'total_quantity'] as const,
  totalPrice: () => [...cartKeys.all, 'total_price'] as const,
};
