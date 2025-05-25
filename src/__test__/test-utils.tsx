import { ReactElement } from "react";
import { render } from "@testing-library/react";

import { ErrorMessageProvider } from "../context/ErrorMessageContext";
import { CartItemsIdProvider } from "../context/CartItemsContext";

export function renderWithProviders(children: ReactElement) {
  return render(
    <ErrorMessageProvider>
      <CartItemsIdProvider>{children}</CartItemsIdProvider>
    </ErrorMessageProvider>
  );
}
