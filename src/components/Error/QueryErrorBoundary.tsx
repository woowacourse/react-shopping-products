import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './ErrorPage';
import { PropsWithChildren } from 'react';

const QueryErrorBoundary = ({ children }: PropsWithChildren) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <ErrorPage resetErrorBoundary={resetErrorBoundary} />
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default QueryErrorBoundary;
