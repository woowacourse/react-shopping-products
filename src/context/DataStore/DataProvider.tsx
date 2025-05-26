import React, { useReducer, ReactNode } from 'react';
import { DataContext } from './DataContext';
import { dataReducer } from './dataReducer';
import { initialState } from './constants';

type DataProviderProps = {
  children: ReactNode;
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const contextValue = {
    state,
    dispatch,
  };

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};
