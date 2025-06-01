// import { render, screen, fireEvent } from "@testing-library/react";
// import * as productApi from "../src/api/getProducts";
// import { vi, describe, it, afterEach } from "vitest";
// import ProductListContainer from "../src/Component/Product/ProductListContainer";
// import { MOCK_PRODUCTS } from "./Constants";
// import React from "react";
// import { APIProvider } from "../src/domain/contexts/APIContext";
// import * as deleteApi from "../src/api/deleteShoppingCart";
// import * as patchApi from "../src/api/patchShoppingCart";
// import QuantityController from "../src/Component/Common/QuantityController";
// import ProductItem from "../src/Component/Product/ProductItem";

// vi.spyOn(deleteApi, "default").mockResolvedValue(undefined);
// vi.spyOn(patchApi, "default").mockResolvedValue(undefined);

// vi.mock("../src/api/getShoppingCart", () => ({
//   __esModule: true,
//   default: vi.fn(),
// }));

// describe("ProductListContainer", () => {
//   afterEach(() => {
//     vi.clearAllMocks();
//     vi.resetAllMocks();
//   });

//   it("상품 목록을 성공적으로 렌더링한다", async () => {
//     vi.spyOn(productApi, "default").mockResolvedValue({
//       content: MOCK_PRODUCTS,
//     });

//     render(
//       <APIProvider>
//         <ProductListContainer />
//       </APIProvider>
//     );

//     for (const p of MOCK_PRODUCTS) {
//       expect(await screen.findByText(p.name)).toBeInTheDocument();
//       expect(
//         screen.getByText(p.price.toLocaleString("ko") + "원")
//       ).toBeInTheDocument();
//     }
//   });

//   it("수량이 2일 때 감소 버튼 클릭 시 refetch가 호출된다", async () => {
//     mockedGetCart
//       .mockResolvedValueOnce({ content: CART_DUMMY })
//       .mockResolvedValueOnce({ content: SINGLE_ITEM });
//     render(
//       <ProductItem
//         id={1}
//         name="주렁"
//         price={1000}
//         imageUrl="1"
//         quantity={2}
//         category="패션잡화"
//       />
//     );

//     screen.debug();
//     fireEvent.click(screen.getByTestId("remove-btn-1"));

//     // ✅ patchShoppingCart가 정상 작동하면 refetch도 호출되어야 함
//     // expect(screen.getByText("1")).toBeInTheDocument();
//   });
// });
