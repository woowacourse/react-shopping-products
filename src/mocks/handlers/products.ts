import { http, HttpResponse } from 'msw';
import { MOCK_PRODUCTS, MockProductsType } from '../dummy';

interface GetProductsParams {
  productId: string;
}

const addBaseURL = (endpoint: string) => {
  return `${import.meta.env.VITE_API_BASE_URL}${endpoint}`;
};

const handlers = [
  http.get<never, MockProductsType[]>(addBaseURL('/products'), ({ request }) => {
    const url = new URL(request.url);
    const params = url.searchParams;
    const category = params.get('category');
    const sortParam = params.get('sort') ?? '';
    const [field, order] = sortParam.split(',');

    let mockProducts = [...MOCK_PRODUCTS];
    if (field && field !== '전체') {
      mockProducts = mockProducts.filter((p) => p.category === category);
    }

    if (field === 'price') {
      mockProducts.sort((a, b) => (order === 'desc' ? b.price - a.price : a.price - b.price));
    }

    return HttpResponse.json({ content: MOCK_PRODUCTS });
  }),

  http.get<GetProductsParams, MockProductsType[]>(
    addBaseURL('/products/:productId'),
    async ({ params }) => {
      const { productId } = params;
      const targetProduct = MOCK_PRODUCTS.find(({ id }) => String(id) === productId);

      return HttpResponse.json(targetProduct);
    },
  ),
];

export default handlers;
