import { ReactNode } from 'react';
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner';

type OptionalSuspenseProps = {
  isFetching: boolean;
  children: ReactNode;
  fallbackComponent: ReactNode;
};

const OptionalSuspense = ({ isFetching, children, fallbackComponent }: OptionalSuspenseProps) => {
  return <>{isFetching ? fallbackComponent : children}</>;
};

export default OptionalSuspense;
