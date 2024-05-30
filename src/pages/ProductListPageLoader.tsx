import { PropsWithChildren } from 'react';
import { useCartItemListContext } from '@/hooks/useCartItemList';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';

const ProductListPageLoader = ({ children }: PropsWithChildren) => {
  const { loading } = useCartItemListContext();

  if (loading) return <LoadingSpinner />;

  return <>{children}</>;
};

export default ProductListPageLoader;
