import { http, HttpResponse } from 'msw';

import { END_POINTS } from '../../../apis/config';
import { PRODUCT_LIST } from '../../../constants/productList';
import { Product } from '../../../types/type';

import productListData from './defaultData.json';

export const productListHandlers = [
  http.get(END_POINTS.PRODUCTS, ({ request }) => {
    const url = new URL(request.url);
    const initialData: Product[] = productListData;
    const page = Number(url.searchParams.get('page') || '0');
    const category = url.searchParams.get('category') || '';

    const sort = url.searchParams.getAll('sort') || ['price,asc', 'name,asc'];
    const isValidSortParams = !sort.some((option) => {
      const [sortType, sortProperty] = option.split(',');
      return (
        !Object.keys(initialData[0]).includes(sortType) ||
        !['asc', 'desc'].includes(sortProperty)
      );
    });
    if (!isValidSortParams) {
      return new HttpResponse('올바른 형식의 sort parameter가 아닙니다.', {
        status: 400,
      });
    }

    const limit =
      page === 0 ? PRODUCT_LIST.initialQuantity : PRODUCT_LIST.quantityPerPage;

    const start = page * limit;
    const end = start + limit;

    const filteredData =
      category === ''
        ? initialData
        : initialData.filter((item) => item.category === category);

    const sortedData = filteredData.sort((a, b) => {
      for (const option of sort) {
        const [sortType, sortProperty] = option.split(',');
        const sortKey = sortType as keyof Product;
        const sortOrder = sortProperty === 'asc' ? 1 : -1;

        if (a[sortKey] < b[sortKey]) return -1 * sortOrder;
        if (a[sortKey] > b[sortKey]) return 1 * sortOrder;
      }
      return 0;
    });

    const paginatedData = sortedData.slice(start, end);
    const lastPage =
      sortedData.length <= PRODUCT_LIST.initialQuantity
        ? 0
        : sortedData.length - 1 / PRODUCT_LIST.quantityPerPage;

    const isLastPage = lastPage === page;
    return new HttpResponse(
      JSON.stringify({ content: paginatedData, last: isLastPage }),
      {
        status: 200,
      },
    );
  }),
];
