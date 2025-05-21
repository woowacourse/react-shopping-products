import { http, HttpResponse } from 'msw';
import { END_POINT } from '../api/constants/endPoint';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

// 장바구니 mock 데이터
const cartItems: CartItem[] = [
  {
    id: 1004,
    product: {
      id: 1,
      name: '상품 1',
      price: 10000,
      imageUrl: 'https://example.com/image1.jpg',
      category: '패션잡화',
    },
    quantity: 2,
  },
  {
    id: 1005,
    product: {
      id: 2,
      name: '상품 2',
      price: 20000,
      imageUrl: 'https://example.com/image2.jpg',
      category: '패션잡화',
    },
    quantity: 1,
  },
  {
    id: 1006,
    product: {
      id: 3,
      name: '상품 3',
      price: 15000,
      imageUrl: 'https://example.com/image3.jpg',
      category: '식료품',
    },
    quantity: 3,
  },
  {
    id: 1007,
    product: {
      id: 4,
      name: '상품 4',
      price: 25000,
      imageUrl: 'https://example.com/image4.jpg',
      category: '식료품',
    },
    quantity: 2,
  },
  {
    id: 1008,
    product: {
      id: 5,
      name: '상품 5',
      price: 35000,
      imageUrl: 'https://example.com/image5.jpg',
      category: '패션잡화',
    },
    quantity: 1,
  },
  {
    id: 1009,
    product: {
      id: 6,
      name: '상품 6',
      price: 45000,
      imageUrl: 'https://example.com/image6.jpg',
      category: '패션잡화',
    },
    quantity: 1,
  },
  {
    id: 1010,
    product: {
      id: 7,
      name: '상품 7',
      price: 55000,
      imageUrl: 'https://example.com/image7.jpg',
      category: '식료품',
    },
    quantity: 1,
  },
  {
    id: 1011,
    product: {
      id: 8,
      name: '상품 8',
      price: 65000,
      imageUrl: 'https://example.com/image8.jpg',
      category: '식료품',
    },
    quantity: 1,
  },
  {
    id: 1012,
    product: {
      id: 9,
      name: '상품 9',
      price: 75000,
      imageUrl: 'https://example.com/image9.jpg',
      category: '패션잡화',
    },
    quantity: 1,
  },
  {
    id: 1013,
    product: {
      id: 10,
      name: '상품 10',
      price: 85000,
      imageUrl: 'https://example.com/image10.jpg',
      category: '패션잡화',
    },
    quantity: 1,
  },
];

export const handlers = [
  // 장바구니 목록 조회
  http.get(END_POINT.CART, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '0');
    const size = Number(url.searchParams.get('size') || '50');

    return HttpResponse.json({
      content: cartItems,
      totalElements: cartItems.length,
      totalPages: 1,
      number: page,
      size: size,
    });
  }),

  // 장바구니 추가
  http.post(END_POINT.CART, async ({ request }) => {
    const requestData = (await request.json()) as { productId: number; quantity: number };
    console.log(`장바구니에 상품 ${requestData.productId}, 수량 ${requestData.quantity} 추가`);
    return new HttpResponse(null, { status: 201 });
  }),

  // 장바구니 삭제
  http.delete(new RegExp(`${END_POINT.CART}/\\d+`), ({ request }) => {
    const cartId = request.url.split('/').pop();
    console.log(`장바구니에서 상품 ${cartId} 삭제`);

    // 204 상태 코드로 응답하되, 본문은 빈 문자열로 설정
    return new HttpResponse('', { status: 204 });
  }),

  // 상품 목록 조회
  http.get(END_POINT.PRODUCT, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '0');
    const size = Number(url.searchParams.get('size') || '20');
    const category = url.searchParams.get('category');
    const sort = url.searchParams.get('sort');

    let products: Product[] = [
      {
        id: 1,
        name: '패션 상품 1',
        price: 10000,
        imageUrl: 'https://example.com/image1.jpg',
        category: '패션잡화',
      },
      {
        id: 2,
        name: '패션 상품 2',
        price: 20000,
        imageUrl: 'https://example.com/image2.jpg',
        category: '패션잡화',
      },
      {
        id: 3,
        name: '식품 1',
        price: 5000,
        imageUrl: 'https://example.com/image3.jpg',
        category: '식료품',
      },
      {
        id: 4,
        name: '식품 2',
        price: 8000,
        imageUrl: 'https://example.com/image4.jpg',
        category: '식료품',
      },
      {
        id: 5,
        name: '패션 상품 3',
        price: 30000,
        imageUrl: 'https://example.com/image5.jpg',
        category: '패션잡화',
      },
      {
        id: 6,
        name: '패션 상품 4',
        price: 40000,
        imageUrl: 'https://example.com/image6.jpg',
        category: '패션잡화',
      },
      {
        id: 7,
        name: '식품 3',
        price: 12000,
        imageUrl: 'https://example.com/image7.jpg',
        category: '식료품',
      },
      {
        id: 8,
        name: '식품 4',
        price: 15000,
        imageUrl: 'https://example.com/image8.jpg',
        category: '식료품',
      },
    ];

    // 카테고리 필터링
    if (category) {
      products = products.filter((product) => product.category === category);
    }

    // 정렬
    if (sort) {
      const [field, direction] = sort.split(',');
      if (field === 'price') {
        products = products.sort((a, b) => {
          return direction === 'asc' ? a.price - b.price : b.price - a.price;
        });
      }
    }

    // 페이지네이션
    const startIndex = page * size;
    const paginatedProducts = products.slice(startIndex, startIndex + size);

    return HttpResponse.json({
      content: paginatedProducts,
      page: page,
      size: size,
      totalElements: products.length,
      totalPages: Math.ceil(products.length / size),
    });
  }),
];
