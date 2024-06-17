import { ReactNode } from 'react';
import ErrorComponent from '@/apis/ErrorComponent/ErrorComponent';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorWithHeader from '@/errors/ErrorWithHeader';

type OptionalErrorBoundaryProps = {
  error: Error | ErrorWithHeader | null;
  isError: boolean;
  children: ReactNode;
};

const OptionalErrorBoundary = ({ error, isError, children }: OptionalErrorBoundaryProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorComponent}>
      {isError && error ? <ErrorComponent error={error} /> : children}
    </ErrorBoundary>
  );
};

export default OptionalErrorBoundary;
