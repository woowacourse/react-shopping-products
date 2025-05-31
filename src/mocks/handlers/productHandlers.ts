import { http, HttpResponse } from 'msw';
import { mockProducts, Product } from '../datas/mockProducts';

type SortOrder = 'asc' | 'desc';

const sortProducts = (products: Product[], sortKey: string, sortOrder: SortOrder): Product[] => {
  return [...products].sort((a, b) => {
    let aValue: string | number = a[sortKey as keyof Product];
    let bValue: string | number = b[sortKey as keyof Product];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });
};

export const productHandlers = [
  http.get(`${import.meta.env.VITE_API_URL}/products`, ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const sortParam = url.searchParams.get('sort');

    let filteredProducts = [...mockProducts];

    if (category && category !== '전체') {
      filteredProducts = filteredProducts.filter((product) => product.category === category);
    }

    if (sortParam) {
      const decodedSort = decodeURIComponent(sortParam);
      const [sortKey, sortOrder] = decodedSort.split(',') as [string, SortOrder];

      if (sortKey && sortOrder) {
        filteredProducts = sortProducts(filteredProducts, sortKey, sortOrder);
      }
    }

    const response: { content: Product[] } = {
      content: filteredProducts,
    };

    return HttpResponse.json(response);
  }),
];
