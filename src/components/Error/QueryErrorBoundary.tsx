import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './ErrorPage';
import { PropsWithChildren } from 'react';
import HttpError from '@/error/HttpError';
import { useState } from 'react';

const QueryErrorBoundary = ({ children }: PropsWithChildren) => {
  const { reset } = useQueryErrorResetBoundary();
  const [message, setMessage] = useState('');

  const handleError = (error: unknown) => {
    if (error instanceof HttpError) {
      setMessage(error.message);
      console.error(`${error.message} ${error.status}`);
    } else if (error instanceof Error) {
      setMessage(error.message);
      console.error(error.message);
    }
  };

  return (
    <ErrorBoundary
      onReset={reset}
      onError={handleError}
      fallbackRender={({ resetErrorBoundary }) => (
        <ErrorPage message={message} resetErrorBoundary={resetErrorBoundary} />
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default QueryErrorBoundary;
