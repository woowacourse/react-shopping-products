import { http, HttpResponse } from 'msw';
import products from './products.json';
import { API_URL } from '../../constants/api';
import { Product } from '../../types/Product.type';

const filterProducts = (products: Product[], category: string) => {
  return category === 'all' ? products : products.filter((product) => product.category === category);
};

const sortProducts = (products: Product[], sortOrder: string) => {
  if (sortOrder === 'asc') return products.sort((prev, cur) => prev.price - cur.price);
  return products.sort((prev, cur) => cur.price - prev.price);
};

export const handlers = [
  http.get(`${API_URL}/products`, ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') || '0');
    const size = Number(url.searchParams.get('size') || '20');
    const category = url.searchParams.get('category') || 'all';
    const sort = url.searchParams.get('sort') || 'price,asc';

    const [, sortOrder] = sort.split(',');

    const start = page === 0 ? 0 : (page - 1) * 4 + 20;
    const end = start + size;

    let filteredProducts = filterProducts(products, category);
    filteredProducts = sortProducts(filteredProducts, sortOrder);

    const paginatedProducts = filteredProducts.slice(start, end);

    return HttpResponse.json({ content: paginatedProducts, last: end >= products.length });
  }),
];
