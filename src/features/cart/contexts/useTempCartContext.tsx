import { useContext } from 'react';
import { TempCartContext } from './TempCartProvider';

export const useTempCartContext = () => {
  const context = useContext(TempCartContext);
  if (!context) {
    throw new Error('useTempCartContext must be used within a TempCartProvider');
  }
  return context;
};
