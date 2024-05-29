import APIErrorFallback from '../../common/APIErrorFallback';
import { LoadingSpinner } from '../../common/LoadingBox/style';
import * as S from './style';

interface ProductListProps {
  loading: boolean;
  error: Error | null;
}

export default function ProductList({
  children,
}: React.PropsWithChildren<ProductListProps>) {
  return (
    <S.Grid>

      {children}

    </S.Grid>
  );
}
