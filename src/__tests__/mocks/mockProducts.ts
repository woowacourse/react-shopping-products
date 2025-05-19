import { GetProductResponse } from "../../types/product";

const mockProducts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `에어포스${i + 1}`,
  price: 100000 + i * 10000,
  category: i % 2 === 0 ? "패션잡화" : "식료품",
  imageUrl: "aaaaaaaaaa",
}));

export const mockProductsResponse: GetProductResponse = {
  content: mockProducts,
  pageable: {
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    offset: 0,
    pageNumber: 0,
    pageSize: 20,
    paged: true,
    unpaged: false,
  },
  totalElements: mockProducts.length,
  totalPages: 1,
  last: true,
  size: 20,
  number: 0,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false,
  },
  numberOfElements: mockProducts.length,
  first: true,
  empty: false,
};
