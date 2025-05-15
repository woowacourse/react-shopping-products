import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ErrorContextProvider } from "./contexts/ErrorContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorContextProvider>
      <App />
    </ErrorContextProvider>
  </React.StrictMode>
);
