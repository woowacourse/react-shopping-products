import { ProductListResponse } from '@/types/response';

export const getInitialProductData = (): ProductListResponse => ({
  content: [],
  pageable: {
    pageNumber: 0,
    pageSize: 20,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
    offset: 0,
    paged: true,
    unpaged: false,
  },
  last: true,
  totalElements: 0,
  totalPages: 0,
  size: 0,
  number: 0,
  sort: {
    empty: true,
    sorted: false,
    unsorted: true,
  },
  first: true,
  numberOfElements: 0,
  empty: true,
});
