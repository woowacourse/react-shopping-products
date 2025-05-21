import React from "react";
import { render } from "@testing-library/react";
import { ErrorContextProvider } from "../contexts/ErrorContext";
import { QueryContextProvider } from "../contexts/QueryContext";

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <ErrorContextProvider>
      <QueryContextProvider>{ui}</QueryContextProvider>
    </ErrorContextProvider>
  );
}
export async function renderAppWithProviders() {
  const { default: App } = await import("../App");
  return renderWithProviders(<App />);
}
