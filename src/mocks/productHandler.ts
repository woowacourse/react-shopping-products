import { HttpResponse, http } from 'msw';
import { ENDPOINTS_CART, ENDPOINTS_PRODUCTS } from '../api/endpoints';
import { mockProductsResponse } from './products';

export const getProductsHandler = http.get(
  ENDPOINTS_PRODUCTS,
  ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page'));
    const size = Number(url.searchParams.get('size'));
    const sortings = url.searchParams.getAll('sort');
    const category = url.searchParams.get('category');

    const productCopy = Object.assign({}, mockProductsResponse);
    productCopy.content = filterProductHandler(productCopy, category);

    const productSorted = sortProductHandler(sortings, productCopy);

    const start = page * size;
    const end = (page + 1) * size;
    const productSliced = Object.assign({}, productSorted);
    productSliced.content = productSorted.content.slice(start, end);
    productSliced.last =
      productSliced.content.at(-1)!.id === productSorted.content.at(-1)!.id;

    return HttpResponse.json(productSliced);
  },
);

export const postProductsHandler = http.post(
  `${ENDPOINTS_CART}`,
  async ({ request }: { request: StrictRequest<PostCartItemRequestBody> }) => {
    const product = await request.json();
    const id = product.productId;
    const findProduct = mockProductsResponse.content.find(
      (product) => product.id === id,
    );

    if (findProduct) {
      const data = {
        id: Math.random() * 1000,
        quantity: 1,
        product: findProduct,
      };
      mockCartResponse.content = [...mockCartResponse.content, data];
    }
    return HttpResponse.json(mockCartResponse);
  },
);
