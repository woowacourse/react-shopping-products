import ProductListLayout from '../ProductListLayout/ProductListLayout';
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../../../types/common';
import LoadingSpinner from '../../@common/LoadingSpinner/LoadingSpinner';

interface ProductListProps {
  data: Product[];
  isLoading: boolean;
}

const ProductList = ({ data, isLoading }: ProductListProps) => {
  return (
    <ProductListLayout>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        data.map((product) => <ProductCard key={product.id} {...product} />)
      )}
    </ProductListLayout>
  );
};

export default ProductList;
