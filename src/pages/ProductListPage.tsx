import CartBadge from "@/components/CartBadge";
import Header from "@/components/Header";
import TextBox from "@/components/_common/TextBox";
import styled from "styled-components";
import SelectBox from "@/components/SelectBox";
import { CATEGORY, SORT } from "@/constants/selectOption";
import ItemCardList from "@/components/ItemCardList";

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
            <SelectBox optionsContents={Object.values(CATEGORY)} />
            <SelectBox optionsContents={Object.values(SORT)} />
          </SelectBoxWrapper>
        </ItemInfoWrapper>
        <ItemCardList />
      </Wrapper>
    </>
  );
};

export default ProductListPage;

const Wrapper = styled.div`
  padding: 36px 23.5px 36px;
`;

const SelectBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ItemInfoWrapper = styled.div`
  gap: 24px;
  display: flex;
  flex-direction: column;
`;
