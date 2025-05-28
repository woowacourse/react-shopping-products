import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/reset.css";
import { Global } from "@emotion/react";
import { globalStyle } from "./styles/global";
import { setupWorker } from "msw/browser";
import { productHandler } from "./mocks/product/productHandler.tsx";
import { shoppingCartHandler } from "./mocks/shoppingCart/shoppingCartHandler.tsx";

const worker = setupWorker(...productHandler, ...shoppingCartHandler);
const test = async () => {
  return worker.start();
};

test().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Global styles={globalStyle} />
      <App />
    </React.StrictMode>
  );
});
