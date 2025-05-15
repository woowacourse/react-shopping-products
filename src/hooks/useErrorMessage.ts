import { useCallback, useEffect, useState } from "react";

const useErrorMessage = () => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [errorMessage]);

  const handleErrorMessage = useCallback((newErrorMessage: string) => {
    setErrorMessage(newErrorMessage);
  }, []);

  return { errorMessage, handleErrorMessage };
};

export default useErrorMessage;
