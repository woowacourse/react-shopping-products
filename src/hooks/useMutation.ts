import { useState } from "react";

const useMutation = (mutationFn: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async () => {
    setIsLoading(true);

    try {
      mutationFn();
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
};

export default useMutation;
