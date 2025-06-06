import React, { createContext, useReducer, ReactNode, useMemo } from 'react';
import { dataReducer } from './dataReducer';
import { DataStore, DataAction } from '../../types/dataStore';

type DataContextValue = {
  state: DataStore;
  dispatch: React.Dispatch<DataAction>;
};

type DataProviderProps = {
  children: ReactNode;
};

const initialState: DataStore = {
  products: {
    data: null,
    loading: false,
    error: null,
  },
  'cart-items': {
    data: null,
    loading: false,
    error: null,
  },
};

export const DataContext = createContext<DataContextValue | undefined>(undefined);

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch],
  );

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};
