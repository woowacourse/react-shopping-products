import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";

async function enableMocking() {
  // 개발상태이면 연결하겠다.
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser");
  return worker.start();
}

// enableMocking().then(() => {
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// });
