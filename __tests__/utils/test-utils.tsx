import { vi } from 'vitest';
import { render } from '@testing-library/react';
import { ToastContext } from '../../src/context/Toast/ToastContext';
import { DataProvider } from '../../src/context/DataStore/DataProvider';

export const mockShowToast = vi.fn();

const MockToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToastContext.Provider value={{ showToast: mockShowToast }}>{children}</ToastContext.Provider>
  );
};

const TestProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <DataProvider>
      <MockToastProvider>{children}</MockToastProvider>
    </DataProvider>
  );
};

export const renderWithProviders = (ui: React.ReactNode) => {
  return render(ui, { wrapper: TestProviders });
};
