import { Modal } from "paran-simple-modal";
import * as S from "./Cart.style";
import CartItemList from "../../components/CartItemList/CartItemList";
import ErrorBoundary from "../../components/Error/ErrorBoundary";
import ErrorFallback from "../../components/Error/ErrorFallback/ErrorFallback";
import { QueryErrorResetBoundary } from "@tanstack/react-query";

interface CartProps {
  setIsCartModalOpen: (isCartModalOpen: boolean) => void;
}

function Cart({ setIsCartModalOpen }: CartProps) {
  return (
    <S.Container>
      <Modal
        position="bottom"
        onBackdropClick={() => setIsCartModalOpen(false)}
        style={{ maxHeight: "90vh" }}
      >
        <Modal.Title title="장바구니" />
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              fallback={
                <ErrorFallback message="오류가 발생했습니다." onRetry={reset} />
              }
            >
              <CartItemList />
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
        <S.CloseButton onClick={() => setIsCartModalOpen(false)}>
          닫기
        </S.CloseButton>
      </Modal>
    </S.Container>
  );
}

export default Cart;
