import { ProductDropdownOptions } from '@components/product/ProductDropdown/ProductDropdown.type';

export const QUERY_KEY = {
  products: ['products'],
  productsWithPagination: (dropdownOptions: ProductDropdownOptions) => [
    ...QUERY_KEY.products,
    dropdownOptions,
  ],
  cartItems: ['cart-items'],
} as const;
