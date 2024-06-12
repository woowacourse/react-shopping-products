import { useState } from "react";
import { ErrorContext, ErrorState } from "./ErrorContext";

export default function ErrorProvider({ children }: React.PropsWithChildren) {
  const [error, setError] = useState<ErrorState>(null);

  return <ErrorContext.Provider value={{ error, setError }}>{children}</ErrorContext.Provider>;
}
