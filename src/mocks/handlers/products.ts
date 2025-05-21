import { http, HttpResponse } from 'msw';
import { ProductItemType } from '../../types/data';

const MOCK_PRODUCTS: ProductItemType[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `상품 ${index + 1}`,
  category: index % 2 === 0 ? '식료품' : '패션잡화',
  price: 1000 + index * 100,
  imageUrl: `/images/product-${index + 1}.jpg`,
  quantity: 20,
}));

interface GetProductsParams {
  productId: string;
}

interface GetProductsResponse extends ProductItemType {
  quantity: number;
}

const handlers = [
  http.get<never, GetProductsResponse>(/\/products(?:\?.*)?$/, ({ request }) => {
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

  http.get<GetProductsParams, GetProductsResponse>('/products/:productId', async ({ params }) => {
    const { productId } = params;

    return HttpResponse.json([
      {
        id: Number(productId),
        name: '운동화',
        price: 100000,
        imageUrl: 'string',
        category: '패션잡화',
        quantity: 50,
      },
    ]);
  }),
];

export default handlers;
