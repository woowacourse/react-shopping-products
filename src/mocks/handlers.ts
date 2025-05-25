import { http, HttpResponse } from "msw";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const products = [
  {
    id: 42,
    name: "프린세스 미용놀이",
    price: 1010,
    imageUrl: "",
    category: "패션잡화",
  },
  {
    id: 5,
    name: "동물 양말",
    price: 20000,
    imageUrl:
      "https://m.cocosocks.com/web/product/medium/202503/940897aced51144109baa4d145def01f.jpg",
    category: "패션잡화",
  },
  {
    id: 57,
    name: "후추",
    price: 23000,
    imageUrl: "",
    category: "패션잡화",
  },
  {
    id: 4,
    name: "달 무드등",
    price: 28000,
    imageUrl: "",
    category: "패션잡화",
  },
  {
    id: 8,
    name: "앵그리버드",
    price: 50000,
    imageUrl:
      "https://media.bunjang.co.kr/product/223522208_%7Bcnt%7D_1683581287_w%7Bres%7D.jpg",
    category: "패션잡화",
  },
  {
    id: 1,
    name: "에어포스1",
    price: 100000,
    imageUrl: "",
    category: "패션잡화",
  },
  {
    id: 2,
    name: "에어포스2",
    price: 100000,
    imageUrl: "",
    category: "패션잡화",
  },
  {
    id: 3,
    name: "에어포스3",
    price: 100000,
    imageUrl: "",
    category: "패션잡화",
  },
  {
    id: 9,
    name: "너에게난~ 해질녘 노을처럼~",
    price: 200000,
    imageUrl:
      "https://blog.kakaocdn.net/dn/qCz9R/btrmYEn7tZV/Uxh60wpS69qCFymU4WKOy0/img.jpg",
    category: "패션잡화",
  },
  {
    id: 22,
    name: "앵버잠옷",
    price: 200000,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZeoCnBP_VbQ4pLozKbZOIu6B0A9FB3gaeQA&s",
    category: "패션잡화",
  },
  {
    id: 29,
    name: "19×19×19 큐브",
    price: 850000,
    imageUrl: "",
    category: "패션잡화",
  },
  {
    id: 33,
    name: "iPhone 16 Pro Max 1TB",
    price: 2500000,
    imageUrl: "",
    category: "패션잡화",
  },
  {
    id: 37,
    name: "패셔니스타 유담이",
    price: 3000000,
    imageUrl: "https://image.yes24.com/goods/84933797/XL",
    category: "패션잡화",
  },
  {
    id: 24,
    name: "부리부리 원형 테이블",
    price: 3210000,
    imageUrl: "",
    category: "패션잡화",
  },
  {
    id: 93,
    name: "강자의 포즈",
    price: 8001444,
    imageUrl:
      "https://mblogthumb-phinf.pstatic.net/data2/2004/8/2/82/2-7595.jpg?type=w420",
    category: "패션잡화",
  },
  {
    id: 23,
    name: "리바이 아커만",
    price: 60000000,
    imageUrl: "",
    category: "패션잡화",
  },
];

export const handlers = [
  http.get(`${BASE_URL}products?sort=price%252Casc`, () => {
    return HttpResponse.json({ content: products });
  }),
];
