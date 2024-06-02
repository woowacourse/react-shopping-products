import React from "react";
import ReactDOM from "react-dom/client";
import App from "@src/App.tsx";
import { GlobalLayout, GlobalStyle } from "@styles/GlobalStyle.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyle />
    <GlobalLayout>
      <App />
    </GlobalLayout>
  </React.StrictMode>
);
