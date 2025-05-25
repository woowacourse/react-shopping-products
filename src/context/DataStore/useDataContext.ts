import { useContext } from 'react';
import { DataContext, DataContextValue } from './DataContext';

export const useDataContext = (): DataContextValue => {
  const context = useContext(DataContext);

  if (context === undefined) {
    throw new Error(
      'useDataContext는 반드시 DataProvider 내에서 사용되어야 합니다. ' +
        '컴포넌트가 <DataProvider>로 감싸져 있는지 확인하세요.',
    );
  }

  return context;
};
