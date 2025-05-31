import { http, HttpResponse } from 'msw';
import { MAX_STOCK } from '../../constant/product';

interface ProductWithStock {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  quantity: number;
}

const products: ProductWithStock[] = [
  {
    id: 1,
    name: '에어포스',
    price: 129000,
    imageUrl: 'https://via.placeholder.com/200',
    category: '패션잡화',
    quantity: MAX_STOCK,
  },
  {
    id: 2,
    name: '맥북 프로',
    price: 2500000,
    imageUrl: 'https://via.placeholder.com/200',
    category: '전자기기',
    quantity: MAX_STOCK,
  },
  {
    id: 3,
    name: '아이패드',
    price: 800000,
    imageUrl: 'https://via.placeholder.com/200',
    category: '전자기기',
    quantity: MAX_STOCK,
  },
  {
    id: 4,
    name: '커피',
    price: 5000,
    imageUrl: 'https://via.placeholder.com/200',
    category: '식료품',
    quantity: MAX_STOCK,
  },
];

export const productHandlers = [
  http.get('/products', ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const sort = url.searchParams.get('sort');

    let filteredProducts = [...products];

    if (category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category
      );
    }

    if (sort) {
      const [field, order] = sort.split(',');
      if (field === 'price') {
        filteredProducts.sort((a, b) => {
          return order === 'desc' ? b.price - a.price : a.price - b.price;
        });
      }
    }

    return HttpResponse.json({
      content: filteredProducts,
      pageable: {
        pageNumber: 0,
        pageSize: 20,
        sort: { empty: false, sorted: true, unsorted: false },
        offset: 0,
        paged: true,
        unpaged: false,
      },
      last: true,
      totalElements: filteredProducts.length,
      totalPages: 1,
      size: filteredProducts.length,
      number: 0,
      sort: { empty: false, sorted: true, unsorted: false },
      first: true,
      numberOfElements: filteredProducts.length,
      empty: filteredProducts.length === 0,
    });
  }),

  http.get('/products/:id', ({ params }) => {
    const id = Number(params.id);
    const product = products.find((p) => p.id === id);

    if (!product) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(product);
  }),
];
