import { http, HttpResponse } from 'msw';
import mockProducts from './mockProduct.json';

export const handlers = [
  http.get(
    'http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/products',
    ({ request }) => {
      const url = new URL(request.url);
      const category = url.searchParams.get('category');
      const sort = url.searchParams.get('sort');
      const size = parseInt(url.searchParams.get('size') || '20');

      console.log('MSW: /products 요청 처리됨 (모킹)', {
        category,
        sort,
        size,
      });

      let filteredProducts = [...mockProducts];
      if (category && category !== '전체') {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === category
        );
      }

      if (sort) {
        if (sort === 'price,desc') {
          filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sort === 'price,asc') {
          filteredProducts.sort((a, b) => a.price - b.price);
        }
      }

      return HttpResponse.json({
        content: filteredProducts,
        totalElements: filteredProducts.length,
        totalPages: 1,
        size: filteredProducts.length,
        number: 0,
      });
    }
  ),
];
