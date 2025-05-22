import useProducts from '../../hooks/useProducts';
import { ProductsContext } from '../contexts/productsContext';

const ProductsProvider = ({ children } : {
  children: React.ReactNode;
}) => {
  const productsValue = useProducts();
  return (
    <ProductsContext.Provider value={productsValue}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
