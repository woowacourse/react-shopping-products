import { HttpResponse, http } from 'msw';

import APIClient from '@apis/APIClient';
import { Product } from '@appTypes/product';
import products from './products';

const getSortingFunc = (sortStandard: string, sortOrder: string) => {
  if (sortStandard !== 'id' && sortStandard !== 'name' && sortStandard !== 'price') return () => 0;
  if (sortOrder !== 'asc' && sortOrder !== 'desc') return () => 0;
  if (sortStandard === 'name')
    return (aProduct: Product, bProduct: Product) =>
      aProduct[sortStandard].localeCompare(bProduct.name) * (sortOrder === 'asc' ? 1 : -1);

  return (aProduct: Product, bProduct: Product) =>
    (aProduct[sortStandard] - bProduct[sortStandard]) * (sortOrder === 'asc' ? 1 : -1);
};

export const handlers = [
  http.get(`${APIClient.API_URL}/products`, ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') || '0');
    const size = Number(url.searchParams.get('size') || '20');
    const sortParam = url.searchParams.get('sort')?.split(',') ?? ['id', 'desc'];

    const category = url.searchParams.get('category') ?? '';

    const sortStandard = sortParam[0] ?? 'id';
    const sortOrder = sortParam[1] ?? 'desc';

    const sortingFunc = getSortingFunc(sortStandard, sortOrder);

    const filteredProduct = products.filter(
      (product) => category === '' || category === product.category
    );

    filteredProduct.sort(sortingFunc);

    const start = page * size;
    const end = (page + 1) * size;

    const last = products.length <= end;
    const paginatedProducts = filteredProduct.slice(start, end);

    return HttpResponse.json({ content: paginatedProducts, last });
  }),
];
