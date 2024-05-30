import ProductListPage from './ProductListPage';
import ProductListPageLoader from './ProductListPageLoader';

const ProductListPageContainer = () => {
  return (
    <ProductListPageLoader>
      <ProductListPage />
    </ProductListPageLoader>
  );
};

export default ProductListPageContainer;
