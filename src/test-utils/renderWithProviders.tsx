import React from "react";
import { render } from "@testing-library/react";
import { ErrorContextProvider } from "../contexts/ErrorContext";
import { QueryContextProvider } from "../contexts/QueryContext";
import { Product, ProductWithQuantity } from "../types/product";

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

export async function renderProductCardWithProviders(
  product: ProductWithQuantity
) {
  const { default: ProductCard } = await import(
    "../components/Product/ProductCard/ProductCard"
  );
  return renderWithProviders(
    <ProductCard
      productId={product.id}
      title={product.name}
      price={product.price}
      imageUrl={product.imageUrl}
    />
  );
}
