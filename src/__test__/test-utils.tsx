import { ReactElement } from "react";
import { render } from "@testing-library/react";

import { ErrorMessageProvider } from "../context/ErrorMessageContext";
import { ResourcesProvider } from "../context/ResourcesContext";

export function renderWithProviders(children: ReactElement) {
  return render(
    <ResourcesProvider>
      <ErrorMessageProvider>{children}</ErrorMessageProvider>
    </ResourcesProvider>
  );
}
