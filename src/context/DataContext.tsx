import { createContext, useContext, useReducer, ReactNode } from 'react';

export interface ResourceState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  timestamp: number | null;
}

interface DataState {
  resources: Record<string, ResourceState<unknown>>;
}

type DataAction =
  | { type: 'FETCH_START'; resourceId: string }
  | { type: 'FETCH_SUCCESS'; resourceId: string; data: unknown }
  | { type: 'FETCH_ERROR'; resourceId: string; error: Error };

const initialState: DataState = {
  resources: {},
};

function dataReducer(state: DataState, action: DataAction): DataState {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        resources: {
          ...state.resources,
          [action.resourceId]: {
            data: state.resources[action.resourceId]?.data || null,
            isLoading: true,
            error: null,
            timestamp: state.resources[action.resourceId]?.timestamp || null,
          },
        },
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        resources: {
          ...state.resources,
          [action.resourceId]: {
            data: action.data,
            isLoading: false,
            error: null,
            timestamp: Date.now(),
          },
        },
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        resources: {
          ...state.resources,
          [action.resourceId]: {
            data: state.resources[action.resourceId]?.data || null,
            isLoading: false,
            error: action.error,
            timestamp: state.resources[action.resourceId]?.timestamp || null,
          },
        },
      };
    default:
      return state;
  }
}

interface DataContextType {
  state: DataState;
  dispatch: React.Dispatch<DataAction>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
}
