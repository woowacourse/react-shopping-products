import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { DEV_ERROR_MESSAGE } from '../constants/errorMessages';

const useDataContext = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error(DEV_ERROR_MESSAGE.INVALID_PROVIDER('DataContext'));
  }

  return context;
};

export default useDataContext;
