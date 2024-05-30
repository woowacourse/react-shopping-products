import APIErrorFallbackModal from '../../common/APIErrorFallbackModal';
import { LoadingSpinner } from '../../common/LoadingSpinner/style';
import * as S from './style';

interface ProductListProps {
  loading: boolean;
  error: Error | null;
}

export default function ProductList({
  error,
  loading,
  children,
}: React.PropsWithChildren<ProductListProps>) {
  return (
    <S.Grid>
      {error && <APIErrorFallbackModal errorMessage={error.message} />}

      {children}

      {loading && (
        <S.LoadingContainer>
          <LoadingSpinner />
        </S.LoadingContainer>
      )}
    </S.Grid>
  );
}
