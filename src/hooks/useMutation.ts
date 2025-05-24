import { useState } from "react";

interface MutateOptions<_, TResult> {
  onSuccess?: (result: TResult) => void;
  onError?: (error: Error) => void;
}

const useMutation = <TData, TResult>(
  mutationFn: (data: TData) => Promise<TResult>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (
    data: TData,
    options?: MutateOptions<TData, TResult>
  ) => {
    setIsLoading(true);

    try {
      const result = await mutationFn(data);

      if (options?.onSuccess) {
        options.onSuccess(result);
      }

      return result;
    } catch (error) {
      setError(error as Error);

      if (options?.onError) {
        options.onError(error as Error);
      }

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
};

export default useMutation;
