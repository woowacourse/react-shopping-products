import { useCallback, useReducer } from "react";
import { TOAST_TYPES } from "../config/toast";
import { FETCH_TYPES } from "./../config/fetch";
import useToast from "./useToast";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: boolean;
  success: boolean;
};

type Action<T> =
  | { type: typeof FETCH_TYPES.START }
  | { type: typeof FETCH_TYPES.SUCCESS; data: T }
  | { type: typeof FETCH_TYPES.ERROR; message: string };

function fetchReducer<T>(
  state: FetchState<T>,
  action: Action<T>
): FetchState<T> {
  switch (action.type) {
    case FETCH_TYPES.START:
      return { data: null, loading: true, error: false, success: false };
    case FETCH_TYPES.SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: false,
        success: true,
      };
    case FETCH_TYPES.ERROR:
      return { data: null, loading: false, error: true, success: false };
    default:
      return state;
  }
}

const useFetch = <T, P = void>(
  fetch: (params: P) => Promise<T>,
  showError = true
) => {
  const { showToast } = useToast();
  const [state, dispatch] = useReducer(fetchReducer<T>, {
    data: null,
    loading: false,
    error: false,
    success: false,
  });

  const fetchData = useCallback(
    async (params?: P) => {
      dispatch({ type: FETCH_TYPES.START });

      try {
        const data = await fetch(params as P);
        dispatch({ type: FETCH_TYPES.SUCCESS, data });
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";

        dispatch({ type: FETCH_TYPES.ERROR, message });
        if (showError) showToast({ message, type: TOAST_TYPES.ERROR });
      }
    },
    [fetch, showError, showToast]
  );

  return { ...state, fetchData };
};

export default useFetch;
