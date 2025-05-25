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
  {
    id: 8,
    name: `홈런볼`,
    price: 1500,
    imageUrl: 'https://example.com/kancho.jpg',
    category: '식료품',
    quantity: 8,
  },
];
const mockCartItems = [
  {
    id: 5606,
    product: mockProducts[1],
    quantity: 1,
  },
  {
    id: 5607,
    product: mockProducts[2],
    quantity: 2,
  },
];

export const handlers = [
  http.get('*/products', ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category') || '전체';
    const priceOrder = url.searchParams.get('sort') || 'price%2Casc';

    let filteredProducts;

    if (category === '전체' || !category) {
      filteredProducts = mockProducts;
    } else {
      filteredProducts = mockProducts.filter(
        (product) => product.category === category
      );
    }

    if (priceOrder === 'price%2Casc') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (priceOrder === 'price%2Cdesc') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    return HttpResponse.json(
      { content: filteredProducts },
      {
        status: 200,
      }
    );
  }),
  http.get('*/cart-items', () => {
    return HttpResponse.json(
      { content: mockCartItems },
      {
        status: 200,
      }
    );
  }),
  http.patch('*/cart-items/:id', async ({ request, params }) => {
    const cartItemId = Number(params.id);
    const { quantity } = (await request.json()) as { quantity: number };

    const cartItem = mockCartItems.find((item) => item.id === cartItemId);

    if (!cartItem) {
      return HttpResponse.json(
        { message: 'Cart item not found' },
        { status: 404 }
      );
    }

    cartItem.quantity = quantity;
    return HttpResponse.json(cartItem, { status: 200 });
  }),

  http.delete('*/cart-items/:id', ({ params }) => {
    const id = Number(params.id);

    const index = mockCartItems.findIndex((item) => item.id === id);
    if (index === -1) {
      return HttpResponse.json(
        { message: 'Cart item not found' },
        { status: 404 }
      );
    }

    mockCartItems.splice(index, 1);
    return HttpResponse.json({ message: 'Deleted' }, { status: 200 });
  }),
  http.post('*/cart-items', async ({ request }) => {
    const { productId, quantity } = (await request.json()) as {
      productId: number;
      quantity: number;
    };

    const product = mockProducts.find((p) => p.id === productId);
    if (!product) {
      return HttpResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    const alreadyExists = mockCartItems.some(
      (item) => item.product.id === productId
    );

    if (alreadyExists) {
      return HttpResponse.json(
        { message: '이미 장바구니에 담긴 상품입니다.' },
        { status: 500 }
      );
    }

    const newCartItem = {
      id: cartItemIdCounter++,
      product,
      quantity,
    };

    mockCartItems.push(newCartItem);

    return HttpResponse.json(newCartItem, { status: 201 });
  }),
];

let cartItemIdCounter = 5608;
