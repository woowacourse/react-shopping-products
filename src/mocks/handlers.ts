import { HttpResponse, StrictRequest, http } from 'msw';
import { ENDPOINTS_CART, ENDPOINTS_PRODUCTS } from '../api/endpoints';
import { PostCartItemRequestBody, ProductResponse } from '../types/fetch';
import productSorter from '../utils/productSorter';
import { mockCartResponse } from './cart';
import { mockProductsResponse } from './products';

const initialCarts = mockCartResponse.content.slice();
const initialProducts = mockProductsResponse.content.slice();
export const resetDB = () => {
  mockCartResponse.content = initialCarts.slice();
  mockProductsResponse.content = initialProducts.slice();
};

const filterProductHandler = (productCopy: ProductResponse, category: string | null) => {
  return category ? productCopy.content.filter((product) => product.category === category) : productCopy.content;
};

const sortProductHandler = (sortings: string[], productCopy: ProductResponse) => {
  return sortings.length > 0 ? productSorter(sortings, productCopy) : productCopy;
};

const getProductsHandler = http.get(ENDPOINTS_PRODUCTS, ({ request }) => {
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
  productSliced.last = productSliced.content.at(-1)!.id === productSorted.content.at(-1)!.id;

  return HttpResponse.json(productSliced);
});

const postProductToCartHandler = http.post(`${ENDPOINTS_CART}`, async ({ request }: { request: StrictRequest<PostCartItemRequestBody> }) => {
  const product = await request.json();
  const id = product.productId;
  const findProduct = mockProductsResponse.content.find((product) => product.id === id);

  if (findProduct) {
    const data = {
      id: Math.random() * 1000,
      quantity: 1,
      product: findProduct,
    };
    mockCartResponse.content = [...mockCartResponse.content, data];
  }
  return HttpResponse.json(mockCartResponse);
});

const getCartHandler = http.get(`${ENDPOINTS_CART}`, async () => {
  return HttpResponse.json(mockCartResponse);
});

const deleteCartHandler = http.delete(`${ENDPOINTS_CART}/:id`, ({ params }) => {
  const id = Number(params.id);
  const newMockCart = mockCartResponse.content.filter((cart) => cart.id !== id);
  mockCartResponse.content = newMockCart;
  return HttpResponse.json(null, { status: 201 });
});

export const handlers = [getProductsHandler, getCartHandler, postProductToCartHandler, deleteCartHandler];
