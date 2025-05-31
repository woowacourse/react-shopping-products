import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { worker } from "./mocks/browser";

import { ErrorMessageProvider } from "./context/ErrorMessageContext.tsx";
import { CartItemsIdProvider } from "./context/CartItemsContext.tsx";

// 리뷰어가 쉽게 확인할 수 있도록, 개발환경 뿐만 아니라, 프로덕션 환경에서도 MSW 를 start 한다.
async function enableMocking() {
  // return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ErrorMessageProvider>
        <CartItemsIdProvider>
          <App />
        </CartItemsIdProvider>
      </ErrorMessageProvider>
    </React.StrictMode>
  );
});
