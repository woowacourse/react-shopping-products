import CartBadge from "@/components/CartBadge";
import Header from "@/components/Header";
import TextBox from "@/components/_common/TextBox";
import styled from "styled-components";
import SelectBox from "@/components/SelectBox";
import { CATEGORY, Category, SORT, Sort } from "@/constants/selectOption";
import ItemCardList from "@/components/ItemCardList";
import useSelect from "@/hooks/useSelect";
import { useContext, useEffect, useRef } from "react";
import useProducts from "@/hooks/useProducts";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { CartItemContext } from "@/provider/cartItemProvider";

const ProductListPage = () => {
  const useCategorySelect = useSelect<Category>("전체");
  const useSortSelect = useSelect<Sort>("낮은 가격순");

  const { products, fetchFirstPage, fetchNextPage, currentPage } = useProducts();
  const ref = useRef<HTMLDivElement>(null);

  const { isIntersecting } = useInfiniteScroll({ threshold: 0.25, rootMargin: "80px" }, ref);

  const category = useCategorySelect.selected;
  const sort = useSortSelect.selected;

  useEffect(() => {
    if (isIntersecting) {
      fetchNextPage(category, currentPage, sort);
    }
  }, [isIntersecting]);

  useEffect(() => {
    fetchFirstPage(category, 0, sort);
  }, [category, sort]);

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
            <SelectBox useSelector={useCategorySelect} optionsContents={Object.keys(CATEGORY)} />
            <SelectBox useSelector={useSortSelect} optionsContents={Object.keys(SORT)} />
          </SelectBoxWrapper>
        </ItemInfoWrapper>
        <ItemCardList products={products} />
      </Wrapper>
      <div ref={ref}></div>
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
