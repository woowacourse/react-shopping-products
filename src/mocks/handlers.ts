import { http, HttpResponse } from "msw";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const products = [
  {
    id: 42,
    name: "프린세스 미용놀이",
    price: 1010,
    imageUrl: "",
    category: "패션잡화",
    quantity: 1,
  },
  {
    id: 5,
    name: "동물 양말",
    price: 20000,
    imageUrl:
      "https://m.cocosocks.com/web/product/medium/202503/940897aced51144109baa4d145def01f.jpg",
    category: "패션잡화",
    quantity: 50,
  },
  {
    id: 57,
    name: "후추",
    price: 23000,
    imageUrl: "",
    category: "패션잡화",
    quantity: 0,
  },
  {
    id: 4,
    name: "달 무드등",
    price: 28000,
    imageUrl: "",
    category: "패션잡화",
    quantity: 50,
  },
  {
    id: 8,
    name: "앵그리버드",
    price: 50000,
    imageUrl:
      "https://media.bunjang.co.kr/product/223522208_%7Bcnt%7D_1683581287_w%7Bres%7D.jpg",
    category: "패션잡화",
    quantity: 50,
  },
  {
    id: 1,
    name: "에어포스1",
    price: 100000,
    imageUrl: "",
    category: "패션잡화",
    quantity: 50,
  },
  {
    id: 2,
    name: "에어포스2",
    price: 100000,
    imageUrl: "",
    category: "패션잡화",
    quantity: 50,
  },
  {
    id: 3,
    name: "에어포스3",
    price: 100000,
    imageUrl: "",
    category: "패션잡화",
    quantity: 50,
  },
  {
    id: 9,
    name: "너에게난~ 해질녘 노을처럼~",
    price: 200000,
    imageUrl:
      "https://blog.kakaocdn.net/dn/qCz9R/btrmYEn7tZV/Uxh60wpS69qCFymU4WKOy0/img.jpg",
    category: "패션잡화",
    quantity: 50,
  },
  {
    id: 22,
    name: "앵버잠옷",
    price: 200000,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZeoCnBP_VbQ4pLozKbZOIu6B0A9FB3gaeQA&s",
    category: "패션잡화",
    quantity: 50,
  },
  {
    id: 29,
    name: "19×19×19 큐브",
    price: 850000,
    imageUrl: "",
    category: "패션잡화",
    quantity: 50,
  },
  {
    id: 33,
    name: "iPhone 16 Pro Max 1TB",
    price: 2500000,
    imageUrl: "",
    category: "패션잡화",
    quantity: 50,
  },
  {
    id: 37,
    name: "패셔니스타 유담이",
    price: 3000000,
    imageUrl: "https://image.yes24.com/goods/84933797/XL",
    category: "패션잡화",
    quantity: 50,
  },
  {
    id: 24,
    name: "부리부리 원형 테이블",
    price: 3210000,
    imageUrl: "",
    category: "패션잡화",
    quantity: 50,
  },
  {
    id: 93,
    name: "강자의 포즈",
    price: 8001444,
    imageUrl:
      "https://mblogthumb-phinf.pstatic.net/data2/2004/8/2/82/2-7595.jpg?type=w420",
    category: "패션잡화",
    quantity: 50,
  },
  {
    id: 23,
    name: "리바이 아커만",
    price: 60000000,
    imageUrl: "",
    category: "패션잡화",
    quantity: 50,
  },
];

const cartItems = [
  {
    id: 7264,
    product: {
      id: 42,
      name: "프린세스 미용놀이",
      price: 1010,
      imageUrl: "",
      category: "패션잡화",
      quantity: 1,
    },
    quantity: 1,
  },
  {
    id: 7275,
    product: {
      id: 5,
      name: "동물 양말",
      price: 20000,
      imageUrl:
        "https://m.cocosocks.com/web/product/medium/202503/940897aced51144109baa4d145def01f.jpg",
      category: "패션잡화",
      quantity: 10,
    },
    quantity: 1,
  },
  {
    id: 7204,
    product: {
      id: 22,
      name: "앵버잠옷",
      price: 200000,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZeoCnBP_VbQ4pLozKbZOIu6B0A9FB3gaeQA&s",
      category: "패션잡화",
      quantity: 20,
    },
    quantity: 1,
  },
];

export const handlers = [
  http.get(`${BASE_URL}products?sort=price%252Casc`, () => {
    return HttpResponse.json({ content: products });
  }),

  http.get(`${BASE_URL}cart-items`, () => {
    return HttpResponse.json({ content: cartItems });
  }),

  http.post(`${BASE_URL}cart-items`, async ({ request }) => {
    const newItem = await request.json();
    const { productId } = newItem;
    const item = products.find((item) => item.id === Number(productId));

    if (item?.quantity === 0) {
      return HttpResponse.json(
        {
          errorCode: "OUT_OF_STOCK",
          message: "재고 수량을 초과하여 담을 수 없습니다.",
        },
        { status: 400 }
      );
    }

    const newCartItem = {
      id: Number(productId) + 7000,
      product: item,
      quantity: 1,
    };

    cartItems.push(newCartItem);

    return HttpResponse.json({ status: 200 });
  }),

  http.delete(`${BASE_URL}cart-items/:id`, ({ params }) => {
    const id = Number(params.id);

    const index = cartItems.findIndex((item) => item.id === id);

    if (index === -1) {
      return HttpResponse.json(
        { errorCode: "NOT_FOUND", message: "해당 아이템을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    cartItems.splice(index, 1);

    return HttpResponse.json(
      { message: "아이템이 삭제되었습니다." },
      { status: 200 }
    );
  }),

  http.patch(`${BASE_URL}cart-items/:id`, async ({ params, request }) => {
    const newItem = await request.json();
    const { quantity } = newItem;
    const { id } = params;
    const item = cartItems.find((item) => item.id === Number(id));

    if (!item) {
      return HttpResponse.json(
        { errorCode: "NOT_FOUND", message: "상품을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    if (item?.product.quantity < Number(quantity)) {
      return HttpResponse.json(
        {
          errorCode: "OUT_OF_STOCK",
          message: "재고 수량을 초과하여 담을 수 없습니다.",
        },
        { status: 400 }
      );
    }

    const itemIndex = cartItems.findIndex((item) => item.id === Number(id));
    if (Number(quantity) === 0) {
      cartItems.splice(itemIndex, 1);
    } else {
      item.quantity = Number(quantity);
    }

    item.quantity = Number(quantity);

    return HttpResponse.json({ status: 200 });
  }),
];
