import { useCallback, useEffect } from "react";
import { ApiResponse, isApiError, isApiSuccess } from "../apiResponse";
import { TOAST_TYPES } from "../../shared/config/toast";
import useToast from "../../shared/hooks/useToast";

const useApiResponseToasts = (autoWatchError?: string | null) => {
  const { showToast } = useToast();

  const handleError = useCallback(
    <T>(response: ApiResponse<T>, customMessage?: string): boolean => {
      if (isApiError(response)) {
        showToast({
          message: customMessage || response.error,
          type: TOAST_TYPES.ERROR,
        });
        return true;
      }

      return false;
    },
    [showToast]
  );

  const handleSuccess = useCallback(
    <T>(
      response: ApiResponse<T> | undefined | null,
      message: string
    ): boolean => {
      const isSuccess =
        !response ||
        isApiSuccess(response) ||
        (!isApiError(response) && response !== undefined && response !== null);

      if (isSuccess) {
        showToast({
          message,
          type: TOAST_TYPES.SUCCESS,
        });
        return true;
      }

      return false;
    },
    [showToast]
  );

  const showSuccess = useCallback(
    (message: string) => {
      showToast({
        message,
        type: TOAST_TYPES.SUCCESS,
      });
    },
    [showToast]
  );

  const showError = useCallback(
    (error: string | null, customMessage?: string) => {
      if (error) {
        showToast({
          message: customMessage ?? error,
          type: TOAST_TYPES.ERROR,
        });
      }
    },
    [showToast]
  );

  useEffect(() => {
    if (autoWatchError) {
      showToast({
        message: autoWatchError,
        type: TOAST_TYPES.ERROR,
      });
    }
  }, [autoWatchError, showToast]);

  return { handleError, handleSuccess, showError, showSuccess };
};

export default useApiResponseToasts;
