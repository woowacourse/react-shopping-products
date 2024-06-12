import ErrorFallback from "@/error/ErrorFallback";
import ErrorBoundary from "@/error/errorBoundary";
import ProductListPage from "@/pages/productListPage";
import Header from "@/components/Header";
import TopButton from "@/components/_common/TopButton";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useState } from "react";
import CartBadge from "@/components/CartBadge";

const ErrorWrapperPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { lockScroll } = useBodyScrollLock();

  const onOpenModal = () => {
    setIsModalOpen(true);
    lockScroll();
  };

  return (
    <>
      <Header>
        <Header.Title text="SHOP" />
        <CartBadge onClick={onOpenModal} />
        <TopButton />
      </Header>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <ProductListPage />
      </ErrorBoundary>
    </>
  );
};

export default ErrorWrapperPage;
