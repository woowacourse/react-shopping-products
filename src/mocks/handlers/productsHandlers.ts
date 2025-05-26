import { http, HttpResponse } from 'msw';
import { mockProducts } from '../data/productsData';

export const productsHandlers = [
  http.get('*/products', ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const sortParam = url.searchParams.get('sort');

    let filteredProducts = mockProducts;
    if (category && category !== '전체') {
      filteredProducts = mockProducts.filter((product) => product.category === category);
    }

    if (sortParam) {
      const [sortKey, sortOrder] = sortParam.split(',');
      if (sortKey === 'price') {
        filteredProducts.sort((a, b) => {
          return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
        });
      }
    }

    const limitedProducts = filteredProducts.slice(0, 20);

    return HttpResponse.json({
      content: limitedProducts,
    });
  }),

  http.get('*/products/:id', ({ params }) => {
    const productId = parseInt(params.id as string);
    const product = mockProducts.find((p) => p.id === productId);

    if (!product) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Product Not Found',
      });
    }

    return HttpResponse.json(product);
  }),
];
