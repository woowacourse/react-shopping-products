import CartBadge from "@/components/CartBadge";
import Header from "@/components/Header";
import TextBox from "@/components/_common/TextBox";
import styled from "styled-components";

const ProductListPage = () => {
  return (
    <>
      <Header>
        <Header.Title text="SHOP" />
        <CartBadge />
      </Header>
      <Wrapper>
        <TextBox type="xLarge" text="bpple 상품 목록" />
      </Wrapper>
    </>
  );
};

export default ProductListPage;

const Wrapper = styled.div`
  padding: 36px 23.5px 36px;
`;
