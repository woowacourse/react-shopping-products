import React from 'react';
import { ErrorProvider } from '../context/ErrorContext';
import { DataProvider } from '../context/DataContext';

export const renderWithProviders = (children: React.ReactNode) => {
  return (
    <ErrorProvider>
      <DataProvider>{children}</DataProvider>
    </ErrorProvider>
  );
};
