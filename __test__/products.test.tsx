import getProducts from "../src/api/getProducts";
import getCartItems from "../src/api/getCartItems";
import postCartItems from "../src/api/postCartItems";
import { describe, it, vi, beforeEach } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import React from "react";
import patchCartItemQuantity from "../src/api/patchCartItemQuantity";
import { Mock } from "vitest";

vi.mock("../src/api/getProducts");
vi.mock("../src/api/getCartItems");
vi.mock("../src/api/postCartItems");
vi.mock("../src/api/patchCartItemQuantity");

const mockedgetProducts = getProducts as unknown as jest.Mock;
const mockedgetCartItems = getCartItems as unknown as jest.Mock;

const PRODUCTS_MOCK_DATA = [
  {
    id: 42,
    name: "프린세스 미용놀이",
    price: 1010,
    imageUrl: "",
    category: "패션잡화",
    quantity: 1,
  },
  {
    id: 51,
    name: "초밥",
    price: 10,
    imageUrl: "",
    category: "식료품",
    quantity: 50,
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
    id: 50,
    name: "밥",
    price: 10,
    imageUrl: "",
    category: "식료품",
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

const CART_MOCK_DATA = [
  {
    id: 7051,
    product: {
      id: 51,
      name: "초밥",
      price: 10,
      imageUrl: "",
      category: "식료품",
      quantity: 50,
    },
    quantity: 3,
  },
];

describe("상품 목록 테스트", () => {
  beforeEach(() => {
    mockedgetProducts.mockResolvedValue({
      data: {
        content: PRODUCTS_MOCK_DATA,
      },
    });
    mockedgetCartItems.mockResolvedValue({
      data: {
        content: CART_MOCK_DATA,
      },
    });
    (postCartItems as Mock).mockImplementation(async (item) => {
      CART_MOCK_DATA.push({
        id: 7000 + item.id,
        product: item,
        quantity: 1,
      });
      return {};
    });
    (patchCartItemQuantity as Mock).mockImplementation(
      async (id: number, quantity: number) => {
        const cartItem = CART_MOCK_DATA.find((item) => item.id === id);
        if (cartItem) {
          cartItem.quantity = quantity;
        }
        return {};
      }
    );
  });

  it("담기 버튼을 누르면 담은 수량(1)이 보인다.", async () => {
    render(<App />);

    const addButton = await screen.findByTestId(
      `add-button${PRODUCTS_MOCK_DATA[0].id}`
    );
    await userEvent.click(addButton);

    await waitFor(() => {
      const quantityAdjuster = screen.getByTestId(
        `count${PRODUCTS_MOCK_DATA[0].id}`
      );
      expect(quantityAdjuster.textContent).toBe("1");
    });
  });

  it("+버튼을 누르면 상품 수량이 추가된다.", async () => {
    render(<App />);
    const initialCount = CART_MOCK_DATA[0].quantity;

    const plusButton = await screen.findByTestId(
      `plus-button${CART_MOCK_DATA[0].product.id}`
    );
    await userEvent.click(plusButton);

    await waitFor(() => {
      const quantityAdjuster = screen.getByTestId(
        `count${CART_MOCK_DATA[0].product.id}`
      );

      expect(quantityAdjuster.textContent).toBe(String(initialCount + 1));
    });
  });

  it("-버튼을 누르면 상품 수량이 감소한다.", async () => {
    render(<App />);
    const initialCount = CART_MOCK_DATA[0].quantity;

    const minusButton = await screen.findByTestId(
      `minus-button${CART_MOCK_DATA[0].product.id}`
    );
    await userEvent.click(minusButton);

    await waitFor(() => {
      const quantityAdjuster = screen.getByTestId(
        `count${CART_MOCK_DATA[0].product.id}`
      );

      expect(quantityAdjuster.textContent).toBe(String(initialCount - 1));
    });
  });

  it("상품 수량이 0일 경우 품절 UI를 표시한다.", async () => {
    render(<App />);
  });
});
