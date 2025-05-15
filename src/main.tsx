import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style/reset.css";
import MobileLayout from "@components/MobileLayout";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MobileLayout>
      <App />
    </MobileLayout>
  </React.StrictMode>
);
