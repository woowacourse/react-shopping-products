import { ReactElement } from "react";
import { render } from "@testing-library/react";
import { ErrorMessageProvider } from "../context/ErrorMessageContext";

export function renderWithProviders(children: ReactElement) {
  return render(<ErrorMessageProvider>{children}</ErrorMessageProvider>);
}
