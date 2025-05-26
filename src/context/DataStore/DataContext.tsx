import React, { createContext } from 'react';
import { DataStore, DataAction } from '../../types/dataStore';

export type DataContextValue = {
  state: DataStore;
  dispatch: React.Dispatch<DataAction>;
};

export const DataContext = createContext<DataContextValue | undefined>(undefined);
