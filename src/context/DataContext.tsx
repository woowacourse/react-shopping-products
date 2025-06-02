import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";

interface DataState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

interface AppDataState {
  [key: string]: DataState<unknown>;
}

const initialState: AppDataState = {};

type DataAction =
  | { type: "SET_LOADING"; key: string; loading: boolean }
  | { type: "SET_DATA"; key: string; data: unknown[] }
  | { type: "SET_ERROR"; key: string; error: string | null }
  | { type: "RESET_STATE"; key: string }
  | { type: "INIT_STATE"; key: string; initialData?: DataState<unknown> };

function dataReducer(state: AppDataState, action: DataAction): AppDataState {
  const { key } = action;

  switch (action.type) {
    case "INIT_STATE":
      return {
        ...state,
        [key]: action.initialData || {
          data: [],
          loading: true,
          error: null,
        },
      };

    case "SET_LOADING":
      return {
        ...state,
        [key]: {
          ...state[key],
          loading: action.loading,
        },
      };

    case "SET_DATA":
      return {
        ...state,
        [key]: {
          data: action.data,
          loading: false,
          error: null,
        },
      };

    case "SET_ERROR":
      return {
        ...state,
        [key]: {
          ...state[key],
          loading: false,
          error: action.error,
        },
      };

    case "RESET_STATE":
      return {
        ...state,
        [key]: {
          data: [],
          loading: true,
          error: null,
        },
      };

    default:
      return state;
  }
}

interface DataContextValue {
  state: AppDataState;

  initState: (key: string, initialData?: DataState<unknown>) => void;
  setLoading: (key: string, loading: boolean) => void;
  setData: <T>(key: string, data: T[]) => void;
  setError: (key: string, error: string | null) => void;
  resetState: (key: string) => void;

  getData: <T>(key: string) => DataState<T> | undefined;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const initState = useCallback(
    (key: string, initialData?: DataState<unknown>) => {
      dispatch({ type: "INIT_STATE", key, initialData });
    },
    []
  );

  const setLoading = useCallback((key: string, loading: boolean) => {
    dispatch({ type: "SET_LOADING", key, loading });
  }, []);

  const setData = useCallback(<T,>(key: string, data: T[]) => {
    dispatch({ type: "SET_DATA", key, data });
  }, []);

  const setError = useCallback((key: string, error: string | null) => {
    dispatch({ type: "SET_ERROR", key, error });
  }, []);

  const resetState = useCallback((key: string) => {
    dispatch({ type: "RESET_STATE", key });
  }, []);

  const getData = useCallback(
    <T,>(key: string): DataState<T> | undefined => {
      return state[key] as DataState<T>;
    },
    [state]
  );

  const value: DataContextValue = {
    state,
    initState,
    setLoading,
    setData,
    setError,
    resetState,
    getData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useDataContext(): DataContextValue {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
}

export function useDataState<T>(key: string) {
  const { getData, setLoading, setData, setError, resetState, initState } =
    useDataContext();

  React.useEffect(() => {
    const currentData = getData<T>(key);
    if (!currentData) {
      initState(key);
    }
  }, [key, getData, initState]);

  return {
    data: getData<T>(key),
    setLoading: (loading: boolean) => setLoading(key, loading),
    setData: (data: T[]) => setData(key, data),
    setError: (error: string | null) => setError(key, error),
    resetState: () => resetState(key),
  };
}
