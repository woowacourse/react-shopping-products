import { Product, ServerResponse } from '@appTypes/index';
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

const productsHandler = [
  http.get(END_POINTS.products, async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page'));
    const size = Number(url.searchParams.get('size'));
    // const category = url.searchParams.get('category');
    const limit = page === 0 ? 20 : 4;
    const start = page === 0 ? 0 : (page - 1) * 4 + 20;
    const end = start + limit;
    const response = makeServerResponse<Product[]>({
      page: Number(page),
      size: Number(size),
      content: products.slice(start, end) as Product[],
    });

    return HttpResponse.json(response);
  }),
];

export default productsHandler;
