import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { ErrorProvider } from "../../contexts";
import { ErrorFallback } from "../../components";
import { ProductPage } from "../../pages";

export default function ProductPageProvider() {
  return (
    <ErrorProvider>
      <ErrorBoundary FallbackComponent={({ error }) => <ErrorFallback error={error} />}>
        <Suspense>
          <ProductPage />
        </Suspense>
      </ErrorBoundary>
    </ErrorProvider>
  );
}
