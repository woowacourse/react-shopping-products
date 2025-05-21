import { http, HttpResponse } from 'msw';
import { ProductItemType } from '../../types/data';

interface GetProductsParams {
  productId: string;
}

interface GetProductsResponse extends ProductItemType {
  quantity: number;
}

const handlers = [
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
