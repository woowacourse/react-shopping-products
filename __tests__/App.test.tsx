// import { describe, it, expect, vi, beforeEach } from "vitest";
// import { render, screen, within } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import React from "react";
// import App from "../src/App";
// import getProducts from "../src/api/getProducts";
// import getShoppingCart from "../src/api/getShoppingCart";
// import postShoppingCart from "../src/api/postShoppingCart";
// import deleteShoppingCart from "../src/api/deleteShoppingCart";
// import type { MockedFunction } from "vitest";
// import { MOCK_PRODUCTS, CART_DUMMY } from "./Constants";

// const mockedGetProducts = getProducts as MockedFunction<typeof getProducts>;
// const mockedGetCart = getShoppingCart as MockedFunction<typeof getShoppingCart>;
// const mockedPostCart = postShoppingCart as MockedFunction<
//   typeof postShoppingCart
// >;
// const mockedDeleteCart = deleteShoppingCart as MockedFunction<
//   typeof deleteShoppingCart
// >;

// const SINGLE_ITEM = [CART_DUMMY[1]];

// vi.mock("../src/api/getProducts", () => ({
//   __esModule: true,
//   default: vi.fn(),
// }));
// vi.mock("../src/api/getShoppingCart", () => ({
//   __esModule: true,
//   default: vi.fn(),
// }));
// vi.mock("../src/api/postShoppingCart", () => ({
//   __esModule: true,
//   default: vi.fn(),
// }));
// vi.mock("../src/api/deleteShoppingCart", () => ({
//   __esModule: true,
//   default: vi.fn(),
// }));

// describe("<App />", () => {
//   beforeEach(() => {
//     vi.resetAllMocks();
//     mockedGetProducts.mockResolvedValue({ content: MOCK_PRODUCTS });
//     mockedPostCart.mockResolvedValue({});
//     mockedDeleteCart.mockResolvedValue();
//   });

//   it("장바구니 제거 시 cart-count가 2 → 1로 감소한다", async () => {
//     mockedGetCart
//       .mockResolvedValueOnce({ content: CART_DUMMY })
//       .mockResolvedValueOnce({ content: SINGLE_ITEM });

//     render(<App />);

//     const count2 = await screen.findByTestId("cart-count");
//     expect(count2).toHaveTextContent("2");

//     const itemLi = screen.getByText("부리부리 원형 테이블").closest("li")!;
//     const removeBtn = within(itemLi).getByText("빼기");
//     await userEvent.click(removeBtn);

//     expect(mockedDeleteCart).toHaveBeenCalledWith(920);
//     expect(mockedGetCart).toHaveBeenCalledTimes(2);

//     const count1 = await screen.findByTestId("cart-count");
//     expect(count1).toHaveTextContent("1");
//   });

//   it("장바구니 추가 시 cart-count가 1 → 2로 증가한다", async () => {
//     mockedGetCart
//       .mockResolvedValueOnce({ content: [CART_DUMMY[0]] })
//       .mockResolvedValueOnce({ content: CART_DUMMY });

//     render(<App />);

//     const initialCount = await screen.findByTestId("cart-count");
//     expect(initialCount).toHaveTextContent("1");

//     const itemLi = screen.getByText("부리부리 원형 테이블").closest("li")!;
//     const addBtn = within(itemLi).getByText("담기");
//     await userEvent.click(addBtn);

//     expect(mockedGetCart).toHaveBeenCalledTimes(2);

//     const updatedCount = await screen.findByTestId("cart-count");
//     expect(updatedCount).toHaveTextContent("2");
//   });

//   it("장바구니 불러오기 실패 시 에러 박스를 띄운다", async () => {
//     mockedGetCart.mockRejectedValue(new Error("서버 오류"));

//     render(<App />);

//     expect(
//       await screen.findByText(
//         /장바구니 조회 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요./i
//       )
//     ).toBeInTheDocument();

//     expect(screen.queryByTestId("cart-count")).toBeNull();
//   });
// });
