import { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';

const useFetchData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useFetchData는 DataProvider 내에서 사용되어야 합니다!');
  return context;
};

export default useFetchData;
