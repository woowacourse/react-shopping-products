import CartBadge from "@/components/CartBadge";
import Header from "@/components/Header";
import TextBox from "@/components/_common/TextBox";
import styled from "styled-components";
import SelectBox from "@/components/SelectBox";

const menu = ["메뉴1", "메뉴2", "메뉴3"];

const ProductListPage = () => {
  return (
    <>
      <Header>
        <Header.Title text="SHOP" />
        <CartBadge />
      </Header>
      <Wrapper>
        <ItemInfoWrapper>
          <TextBox type="xLarge" text="bpple 상품 목록" />
          <SelectBoxWrapper>
            <SelectBox optionsContents={menu} />
            <SelectBox optionsContents={menu} />
          </SelectBoxWrapper>
        </ItemInfoWrapper>
      </Wrapper>
    </>
  );
};

export default ProductListPage;

const Wrapper = styled.div`
  padding: 36px 23.5px 36px;
`;

const SelectBoxWrapper = styled.div`
  gap: 132px;
  display: flex;
`;

const ItemInfoWrapper = styled.div`
  gap: 24px;
  display: flex;
  flex-direction: column;
`;
