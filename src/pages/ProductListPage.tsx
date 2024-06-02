import ProductList from "@components/ProductListPage/ProductList";
import { CartItemsProvider } from "@store/cartItemsContext";
import { ErrorToastProvider } from "@store/errorToastContext";

const ProductListPage = () => {
  return (
    <CartItemsProvider>
      <ErrorToastProvider>
        <ProductList />
      </ErrorToastProvider>
    </CartItemsProvider>
  );
};

export default ProductListPage;
