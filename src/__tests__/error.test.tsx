// import { render, screen, waitFor, act } from "@testing-library/react";
// import { vi } from "vitest";
// import App from "../App";
// import { ErrorContextProvider } from "../contexts/ErrorContext";

// // 가장 먼저 선언해야 타이머 mock이 전체 적용됨
// vi.useFakeTimers();

// const sharedError = new Error(
//   "오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
// );

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
//         error: sharedError, // ✅ 항상 동일한 객체 (무한루프 방지)
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

// it.only("2초 후 토스트가 사라진다", async () => {
//   render(
//     <ErrorContextProvider>
//       <App />
//     </ErrorContextProvider>
//   );

//   const toast = await screen.findByText(sharedError.message);
//   expect(toast).toBeInTheDocument();

//   // ⏱️ setTimeout 반영을 위해 act로 감싸야 리액트 상태 업데이트까지 됨
//   await act(() => {
//     vi.advanceTimersByTime(2000);
//     return Promise.resolve(); // 비동기 처리
//   });

//   await waitFor(() => {
//     expect(screen.queryByText(sharedError.message)).not.toBeInTheDocument();
//   });

//   vi.useRealTimers(); // ✅ cleanup
// });
