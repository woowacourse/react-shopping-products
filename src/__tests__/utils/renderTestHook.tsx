import { Suspense } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";

import ToastsProvider from "../../providers/ToastsProvider";
import { testQueryClient } from "./testQueryClient";

export function WrapperComponent({ children }: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={testQueryClient}>
      <ToastsProvider>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </ToastsProvider>
    </QueryClientProvider>
  );
}

export default function renderTestHook<T>(callback: () => T) {
  return renderHook(callback, {
    wrapper: WrapperComponent,
  });
}
