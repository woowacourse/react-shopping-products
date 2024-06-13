import ErrorFallback from "@/error/ErrorFallback";
import ErrorBoundary from "@/error/errorBoundary";
import Header from "@/components/Header";
import TopButton from "@/components/_common/TopButton";
import CartBadge from "@/components/CartBadge";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import ProductList from "@/pages/productListPage/productList";
import useModal from "@/hooks/useModal";

const ProductListPage = () => {
  const navigate = useNavigate();

  const reloadPage = () => {
    navigate(PATH.RELOAD);
  };

  const { onOpenModal, onCloseModal, isModalOpen } = useModal();

  return (
    <>
      <Header>
        <Header.Title text="SHOP" />
        <CartBadge onClick={onOpenModal} />
        <TopButton />
      </Header>
      <ErrorBoundary fallback={<ErrorFallback message="에러가 발생했습니다." resetError={reloadPage} />}>
        <ProductList isModalOpen={isModalOpen} onCloseModal={onCloseModal} />
      </ErrorBoundary>
    </>
  );
};

export default ProductListPage;
