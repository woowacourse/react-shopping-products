import { CartProvider } from '@/contexts/CartContext';
import { ErrorProvider } from '@/contexts/ErrorContext';
import Products from './Products';

const ProductsProvider = () => {
  return (
    <ErrorProvider>
      <CartProvider>
        <Products />
      </CartProvider>
    </ErrorProvider>
  );
};

export default ProductsProvider;
