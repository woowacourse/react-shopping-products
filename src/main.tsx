import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { DataProvider } from "./contexts/DataContext.tsx";

async function main() {
  if (import.meta.env.MODE === "development") {
    const { worker } = await import("./mocks/browser");
    await worker.start({
      onUnhandledRequest: "bypass",
    });
  }

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <DataProvider>
        <App />
      </DataProvider>
    </React.StrictMode>,
  );
}

main();
