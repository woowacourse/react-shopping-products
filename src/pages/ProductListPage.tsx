import ProductList from "@components/ProductListPage/ProductList";
import { ErrorToastProvider } from "@contexts/errorToast/errorToastContext";

const ProductListPage = () => {
  return (
    <ErrorToastProvider>
      <ProductList />
    </ErrorToastProvider>
  );
};

export default ProductListPage;
