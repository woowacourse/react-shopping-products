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

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
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
      const [sortKey, sortOrder] = sortParam.split('%2C') as [string, SortOrder];
      filteredProducts = sortProducts(filteredProducts, sortKey, sortOrder);
    }

    const response: { content: Product[] } = {
      content: filteredProducts,
    };

    return HttpResponse.json(response);
  }),
];
