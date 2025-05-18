import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style/reset.css";
import MobileLayout from "@components/MobileLayout";
import Toast from "./components/Toast/Toast.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MobileLayout>
      <App />
      <Toast limit={5} duration={3000} />
    </MobileLayout>
  </React.StrictMode>
);
