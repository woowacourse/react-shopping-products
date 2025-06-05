import { CartItemResponse } from '../../types/cartItem';

export const mockCartItemResponse: CartItemResponse = {
  content: [
    {
      id: 1,
      quantity: 2,
      product: {
        id: 26,
        name: '기세',
        price: 100,
        imageUrl: '33',
        category: '식료품',
      },
    },
    {
      id: 2,
      quantity: 1,
      product: {
        id: 42,
        name: '프린세스 미용놀이',
        price: 1010,
        imageUrl:
          'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202204/19/ed8eddd4-0edd-40ad-af7d-44a171577c92.jpg',
        category: '패션잡화',
      },
    },
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 10,
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    offset: 0,
    paged: true,
    unpaged: false,
  },
  last: true,
  totalElements: 2,
  totalPages: 1,
  size: 10,
  number: 0,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false,
  },
  first: true,
  numberOfElements: 2,
  empty: false,
};
