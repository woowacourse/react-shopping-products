import ProductFeed from "@src/components/ProductFeedPage";
import { ErrorToastProvider } from "@contexts/errorToast/errorToastContext";

const ProductFeedPage = () => {
  return (
    <ErrorToastProvider>
      <ProductFeed />
    </ErrorToastProvider>
  );
};

export default ProductFeedPage;
