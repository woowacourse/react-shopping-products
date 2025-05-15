// import { render, screen } from "@testing-library/react";
// import { vi, expect, it } from "vitest";
// import App from "../App";
// import { ErrorContextProvider } from "../contexts/ErrorContext";

// vi.mock("../contexts/CartContext", () => ({
//   useCartContext: () => ({
//     setCartLength: vi.fn(),
//     cartLength: 1,
//   }),
// }));

// vi.mock("../hooks/useFetch", () => ({
//   default: vi.fn((url) => {
//     if (url.toString().includes("products")) {
//       return {
//         data: null,
//         isLoading: false,
//         error: new Error("오류가 발생했습니다. 잠시 후 다시 시도해 주세요."),
//         fetcher: vi.fn(),
//       };
//     }
//     return {
//       data: { content: [] },
//       isLoading: false,
//       error: null,
//       fetcher: vi.fn(),
//     };
//   }),
// }));

// it("에러가 발생했을 때 토스트가 화면에 표시된다", () => {
//   render(
//     <ErrorContextProvider>
//       <App />
//     </ErrorContextProvider>
//   );

//   const errorToast = screen.getByTestId("mocked-error-toast");
//   expect(errorToast).toBeInTheDocument();
//   expect(errorToast).toHaveTextContent(
//     "오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
//   );
// });
