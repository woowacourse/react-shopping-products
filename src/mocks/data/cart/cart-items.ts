export const INITIAL_CART_ITEMS = [
  {
    id: 5237,
    quantity: 1,
    product: {
      id: 3,
      name: "아디다스",
      price: 2000,
      imageUrl: "https://sitem.ssgcdn.com/74/25/04/item/1000373042574_i1_750.jpg",
      category: "fashion",
    },
  },
];

export const CART_ITEMS = {
  content: INITIAL_CART_ITEMS,
  pageable: {
    sort: {
      sorted: false,
      unsorted: true,
      empty: true,
    },
    pageNumber: 0,
    pageSize: 20,
    offset: 0,
    paged: true,
    unpaged: false,
  },
  last: true,
  totalPages: 1,
  totalElements: 1,
  sort: {
    sorted: false,
    unsorted: true,
    empty: true,
  },
  first: true,
  number: 0,
  numberOfElements: 2,
  size: 20,
  empty: false,
};

export const NEW_SHOES_CART_ITEM = {
  id: 6713,
  quantity: 1,
  product: {
    id: 2,
    name: "나이키",
    price: 1000,
    imageUrl:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png",
    category: "fashion",
  },
};

export const NEW_BOOKS_CART_ITEM = {
  id: 7333,
  quantity: 1,
  product: {
    id: 108,
    name: "소설책",
    price: 5000,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1681825268400-c561bd47d586?q=80&w=3544&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "books",
  },
};
