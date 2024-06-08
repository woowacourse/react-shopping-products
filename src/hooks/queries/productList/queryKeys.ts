export const PRODUCT_KEYS = {
  all: ['productList'],
  filter: (filters: (string | undefined)[]) => [...PRODUCT_KEYS.all, ...filters],
} as const;
