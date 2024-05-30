import { Category, PriceSort, Product, ServerResponse } from '@appTypes/index';
import products from '@mocks/data/products.json';
import { http, HttpResponse } from 'msw';

import { END_POINTS } from './../../apis/endPoints';

interface MakeServerResponseParams<T> {
  page: number;
  size: number;
  last?: boolean;
  content: T;
}
const makeServerResponse = <T>({
  page,
  size,
  last = false,
  content,
}: MakeServerResponseParams<T>): ServerResponse<T> => {
  return {
    content,
    pageable: {
      sort: {
        sorted: false,
        unsorted: true,
        empty: true,
      },
      pageNumber: page,
      pageSize: size,
      offset: 0,
      paged: true,
      unpaged: false,
    },
    last,
    totalPages: 100,
    totalElements: 100,
    sort: {
      sorted: false,
      unsorted: true,
      empty: true,
    },
    first: true,
    number: 0,
    numberOfElements: 100,
    size,
    empty: false,
  };
};

const filterProducts = (category: Category | null, products: Product[]) => {
  if (!category) return products;

  return products.filter((product) => product.category === category);
};

const sortProducts = (sort: PriceSort | null, products: Product[]) => {
  if (sort === 'price,asc' || !sort) {
    return products.sort((prev, cur) => prev.price - cur.price);
  }
  return products.sort((prev, cur) => cur.price - prev.price);
};

const productsHandler = [
  http.get(END_POINTS.products, async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page'));
    const size = Number(url.searchParams.get('size'));
    const category = url.searchParams.get('category') as Category | null;
    const sort = url.searchParams.get('sort') as PriceSort | null;

    const filteredProducts = filterProducts(category, products as Product[]);
    const sortedProducts = sortProducts(sort, filteredProducts);

    const limit = page === 0 ? 20 : 4;
    const start = page === 0 ? 0 : (page - 1) * 4 + 20;
    const end = start + limit;

    const response = makeServerResponse<Product[]>({
      page: Number(page),
      size: Number(size),
      content: sortedProducts.slice(start, end),
    });

    return HttpResponse.json(response);
  }),
];

export default productsHandler;
