import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/apis/baseUrl';
import { ENDPOINT } from '@/apis/endpoints';
import products from './productList.json';
import { Category } from '@/types';

type SortBase = 'price';
type SortOrder = 'asce' | 'desc';

const FIRST_LENGTH = 20;

export const handlers = [
  http.get(`${BASE_URL}${ENDPOINT.PRODUCT_LIST}`, ({ request }) => {
    const url = new URL(request.url);

    // TODO as 타입 선언 대체하기
    const category: Category = url.searchParams.get('category') as Category;
    const page = Number(url.searchParams.get('page') || '1');
    const size = Number(url.searchParams.get('size') || '4');
    const [sortBase, sortOrder]: [SortBase, SortOrder] = url.searchParams.get('sort')?.split(',');

    const productListFilteredCategory =
      category === 'all' ? products : products.filter((product) => product.category === category);

    const sortedProductList = productListFilteredCategory.sort((a, b) =>
      sortOrder === 'asce' ? a.price - b.price : b.price - a.price,
    );

    const limit = page === 1 ? FIRST_LENGTH : size; // 첫 시도에는 20개, 그 이후부턴 4개씩
    const start = page === 1 ? 0 : (page - 2) * size + FIRST_LENGTH; // 2페이지부터는 4씩 커서 증가
    const end = start + limit; // 마지막 좌표

    const paginatedProducts = sortedProductList.slice(start, end);

    const totalProducts = sortedProductList.length;

    const remainingProducts = totalProducts - FIRST_LENGTH;
    const subsequentPages = Math.ceil(remainingProducts / size);

    const totalPages = 1 + subsequentPages;

    return HttpResponse.json({
      content: paginatedProducts,
      totalPages,
      pageable: {
        pageNumber: page,
      },
    });
  }),
];
