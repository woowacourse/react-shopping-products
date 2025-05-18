import { useState } from "react";

const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const withLoading = async (asyncCallback: () => Promise<void>) => {
    setIsLoading(true);
    try {
      await asyncCallback();
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, withLoading };
};

export default useLoading;
