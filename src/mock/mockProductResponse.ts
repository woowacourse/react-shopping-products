import { ProductResponse } from "../types/product";

export const mockProductResponse: ProductResponse = {
  content: [
    {
      id: 26,
      name: "기세",
      price: 100,
      imageUrl: "33",
      category: "식료품",
      quantity: 3,
    },
    {
      id: 42,
      name: "프린세스 미용놀이",
      price: 1010,
      imageUrl:
        "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202204/19/ed8eddd4-0edd-40ad-af7d-44a171577c92.jpg",
      category: "패션잡화",
      quantity: 4,
    },
    {
      id: 34,
      name: "코카콜라 제로 1.5L",
      price: 2100,
      imageUrl:
        "https://sitem.ssgcdn.com/88/19/87/item/0000006871988_i1_750.jpg",
      category: "식료품",
      quantity: 5,
    },
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 20,
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    offset: 0,
    paged: true,
    unpaged: false,
  },
  last: false,
  totalElements: 27,
  totalPages: 2,
  size: 20,
  number: 0,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false,
  },
  first: true,
  numberOfElements: 20,
  empty: false,
};
