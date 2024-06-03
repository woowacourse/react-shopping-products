import ProductList from "@components/ProductListPage/ProductList";
import { CartItemsProvider } from "@contexts/cartItems/cartItemsContext";
import { ErrorToastProvider } from "@contexts/errorToast/errorToastContext";

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
