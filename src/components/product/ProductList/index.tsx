import * as S from './style';

import APIErrorToast from '../../common/APIErrorToast';
import { LoadingSpinner } from '../../common/LoadingSpinner/style';

interface ProductListProps {
  isLoading: boolean;
  error: Error | null;
}

// TODO: fetchNextPage까지 prop으로 받아서 내려와야 하나?
export default function ProductList({
  error,
  isLoading,
  children,
}: React.PropsWithChildren<ProductListProps>) {
  return (
    <S.Grid>
      {error && <APIErrorToast errorMessage={error.message} />}

      {children}

      {isLoading && (
        <S.LoadingContainer>
          <LoadingSpinner />
        </S.LoadingContainer>
      )}
    </S.Grid>
  );
}
