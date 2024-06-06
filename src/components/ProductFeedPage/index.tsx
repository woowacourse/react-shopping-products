import styled from "styled-components";

import ShopHeader from "@components/ProductFeedPage/ShopHeader";
import CartModal from "@components/ProductFeedPage/CartModal";
import ProductList from "@components/ProductFeedPage/ProductList";
import { useModalOpen } from "@src/hooks/useModalOpen";

const ProductFeed = () => {
  const [isCartModalOpen, openCartModal, closeCartModal] = useModalOpen();

  return (
    <S.Container>
      <ShopHeader onCartButtonClick={openCartModal} />
      <S.ShopBody>
        <S.Title>bpple 상품 목록</S.Title>
        <ProductList />
      </S.ShopBody>
      <CartModal isOpen={isCartModalOpen} onClose={closeCartModal} />
    </S.Container>
  );
};

export default ProductFeed;

const S = {
  Container: styled.main`
    display: flex;
    flex-direction: column;
    margin-top: 10.4rem;
  `,

  ShopBody: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 0 2rem;
  `,

  Title: styled.h2`
    font-size: 2.4rem;
    font-weight: bold;
  `,
};
