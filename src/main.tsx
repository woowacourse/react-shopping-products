import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/reset.css";
import { setupWorker } from "msw/browser";
import { productHandler } from "./mocks/product/productHandler.tsx";

const worker = setupWorker(...productHandler);
const test = async () => {
  return worker.start();
};

test().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
