import { http, HttpResponse } from 'msw';
import products from './products.json';
import cartItems from './cartItems.json';

const API_URL = import.meta.env.VITE_API_URL;

export const handlers = [
  http.get(`${API_URL}/products`, async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '0');
    const size = Number(url.searchParams.get('size') || '20');
    const category = url.searchParams.get('category');
    const sortParams = url.searchParams.get('sort')?.split(',');

    let filteredProducts = products.content;

    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter((product) => product.category === category);
    }

    if (sortParams && sortParams.length === 2) {
      const [sortKey, sortOrder] = sortParams as [
        'id' | 'name' | 'price' | 'imageUrl' | 'category',
        'asc' | 'desc',
      ];
      filteredProducts.sort((a, b) => {
        const valueA = a[sortKey];
        const valueB = b[sortKey];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        }

        if (sortOrder === 'asc') {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });
    }

    const paginatedProducts = filteredProducts.slice(page * size, (page + 1) * size);

    return HttpResponse.json({
      content: paginatedProducts,
      totalElements: filteredProducts.length,
      totalPages: Math.ceil(filteredProducts.length / size),
      size: size,
      number: page,
      first: page === 0,
      last: (page + 1) * size >= filteredProducts.length,
    });
  }),
  http.get(`${API_URL}/cart-items`, () => {
    return HttpResponse.json(cartItems);
  }),
];
