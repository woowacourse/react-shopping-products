import React from "react";
import { render } from "@testing-library/react";
import { ErrorContextProvider } from "../contexts/ErrorContext";
import { QueryContextProvider } from "../contexts/QueryContext";
import { Product } from "../types/product";

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

export async function renderHeaderWithProviders() {
  const { default: Header } = await import("../components/Header/Header");
  return renderWithProviders(<Header />);
}

export async function renderProductListWithProviders(
  products: Product[] | undefined
) {
  const { default: ProductList } = await import(
    "../components/Product/ProductList/ProductList"
  );
  return renderWithProviders(<ProductList products={products} />);
}
