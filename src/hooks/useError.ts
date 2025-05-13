import { useEffect, useState } from "react";

function useError() {
  const [isError, setIsError] = useState(false);

  function setErrorTrue() {
    setIsError(true);
  }

  useEffect(() => {
    if (!isError) return;
    setTimeout(() => {
      setIsError(false);
    }, 5000);
  }, [isError]);

  return { isError, setErrorTrue };
}

export default useError;
