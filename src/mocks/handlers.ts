import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/apis/baseUrl';
import { ENDPOINT } from '@/apis/endpoints';
import productListData from './productList.json';
import { Category, SortType, Product } from '@/types';

export const handlers = [
  http.get(`${BASE_URL.SHOP}${ENDPOINT.PRODUCT_LIST}`, ({ request }) => {
    const url = new URL(request.url);
    const products: Product[] = productListData as Product[];

    // TODO as 타입 선언 대체하기
    const page = Number(url.searchParams.get('page') ?? '1');
    const size = Number(url.searchParams.get('size') ?? '20');
    const category = url.searchParams.get('category') as Category;
    const sortType = url.searchParams.get('sort') as SortType;

    // 카테고리와 정렬 기준에 맞게 상품 목록 정리
    const productListFilteredCategory: Product[] = !category
      ? products
      : products.filter((product) => product.category === category);
    const sortedProductList = [...productListFilteredCategory].sort((a, b) =>
      sortType === 'asc' ? a.price - b.price : b.price - a.price,
    );

    // 필요한 길이만큼 자르기
    const start = (page - 1) * size;
    const end = start + size;
    const paginatedProducts = sortedProductList.slice(start, end);

    // 입력받은 size를 기반으로 한 총 페이지수 계산
    const totalPages = Math.ceil(products.length / size);

    return HttpResponse.json({
      content: paginatedProducts,
      totalPages,
    });
  }),
];
