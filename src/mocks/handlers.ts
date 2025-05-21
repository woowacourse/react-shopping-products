import { http, HttpResponse } from 'msw';
const mockProducts = [
  {
    id: 1,
    name: `에어포스`,
    price: 20000,
    imageUrl: 'https://example.com/shoes.jpg',
    category: '패션잡화',
    quantity: 0,
  },
  {
    id: 2,
    name: `조던 1`,
    price: 25000,
    imageUrl: 'https://example.com/jordan1.jpg',
    category: '패션잡화',
    quantity: 3,
  },
  {
    id: 3,
    name: `컨버스 척테일러`,
    price: 15000,
    imageUrl: 'https://example.com/converse.jpg',
    category: '패션잡화',
    quantity: 4,
  },
  {
    id: 4,
    name: `뉴발란스 990`,
    price: 22000,
    imageUrl: 'https://example.com/nb990.jpg',
    category: '패션잡화',
    quantity: 2,
  },
  {
    id: 5,
    name: `오리온 초코파이`,
    price: 3000,
    imageUrl: 'https://example.com/chocopie.jpg',
    category: '식료품',
    quantity: 10,
  },
  {
    id: 6,
    name: `농심 신라면`,
    price: 1200,
    imageUrl: 'https://example.com/shinramen.jpg',
    category: '식료품',
    quantity: 2,
  },
  {
    id: 7,
    name: `롯데 칸쵸`,
    price: 1500,
    imageUrl: 'https://example.com/kancho.jpg',
    category: '식료품',
    quantity: 8,
  },
];

export const handlers = [
  http.get('*/products', ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category') || '전체';

    let filteredProducts;

    if (category === '전체' || !category) {
      filteredProducts = mockProducts;
    } else {
      filteredProducts = mockProducts.filter(
        (product) => product.category === category
      );
    }

    return HttpResponse.json(
      { content: filteredProducts },
      {
        status: 200,
      }
    );
  }),
];
