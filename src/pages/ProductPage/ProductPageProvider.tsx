import { Suspense } from "react";
import { ErrorProvider } from "../../contexts";
import ProductPage from "./ProductPage";

export default function ProductPageProvider() {
  return (
    <ErrorProvider>
      <Suspense>
        <ProductPage />
      </Suspense>
    </ErrorProvider>
  );
}
