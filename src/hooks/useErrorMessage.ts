import { useCallback, useState } from "react";

const useErrorMessage = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleErrorMessage = useCallback((newErrorMessage: string) => {
    setErrorMessage(newErrorMessage);
  }, []);

  return { errorMessage, handleErrorMessage };
};

export default useErrorMessage;
