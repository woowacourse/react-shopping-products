import ErrorFallback from "@/error/ErrorFallback";
import ErrorBoundary from "@/error/errorBoundary";
import Header from "@/components/Header";
import TopButton from "@/components/_common/TopButton";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useState } from "react";
import CartBadge from "@/components/CartBadge";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import ProductList from "@/pages/productListPage/productList";

const ProductListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { lockScroll, openScroll } = useBodyScrollLock();

  const onOpenModal = () => {
    setIsModalOpen(true);
    lockScroll();
  };

  const navigate = useNavigate();

  const onCloseModal = () => {
    setIsModalOpen(false);
    openScroll();
  };

  const reloadPage = () => {
    console.log("errr");
    navigate(PATH.RELOAD);
  };
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
