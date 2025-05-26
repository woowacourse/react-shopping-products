import { createContext, useState, PropsWithChildren } from "react";

export const APIContext = createContext<{
  data: Record<string, unknown>;
  setData: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  data: {},
  setData: () => {},
  errorMessage: "",
  setErrorMessage: () => {},
  isLoading: true,
  setIsLoading: () => {},
});

export function APIProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  return (
    <APIContext.Provider
      value={{
        data,
        setData,
        errorMessage,
        setErrorMessage,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </APIContext.Provider>
  );
}
