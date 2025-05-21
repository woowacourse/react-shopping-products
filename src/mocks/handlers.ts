import { http, HttpResponse } from "msw";

const products = [
  {
    id: 1,
    name: "에어포스",
    price: 100000,
    imageUrl: "https://via.placeholder.com/150",
    category: "shoes",
    quantity: 50,
  },
  {
    id: 2,
    name: "나이키 덩크",
    price: 120000,
    imageUrl: "https://via.placeholder.com/150",
    category: "shoes",
    quantity: 30,
  },
  // 필요한 만큼 상품 추가
];

export const handlers = [
  // 전체 상품 목록
  http.get(
    "http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/products?page=0&size=20&sort=asc",
    () => {
      return HttpResponse.json({
        content: products,
        pageable: {
          pageNumber: 0,
          pageSize: 20,
          sort: { empty: false, sorted: true, unsorted: false },
          offset: 0,
          paged: true,
          unpaged: false,
        },
        totalElements: products.length,
        totalPages: 1,
        last: true,
        size: 20,
        number: 0,
        sort: { empty: false, sorted: true, unsorted: false },
        numberOfElements: products.length,
        first: true,
        empty: false,
      });
    },
  ),

  // 단일 상품 조회
  http.get("/products/:id", ({ params }) => {
    const { id } = params;
    const product = products.find((p) => p.id === Number(id));
    if (!product) {
      return HttpResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return HttpResponse.json(product);
  }),
];
