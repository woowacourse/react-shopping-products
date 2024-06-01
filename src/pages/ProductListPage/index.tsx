import CartBadge from "@/components/CartBadge";
import Header from "@/components/Header";
import TextBox from "@/components/_common/TextBox";
import SelectBox from "@/components/SelectBox";
import { CATEGORY, Category, SORT, Sort } from "@/constants/selectOption";
import ItemCardList from "@/components/ItemCardList";
import useSelect from "@/hooks/useSelect";
import { useEffect, useRef } from "react";
import useProducts from "@/hooks/useProducts";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import ItemCartListSkeleton from "@/components/ItemCardList/Skeleton";
import * as S from "@/pages/ProductListPage/style";

const ProductListPage = () => {
  const useCategorySelect = useSelect<Category>("전체");
  const useSortSelect = useSelect<Sort>("낮은 가격순");

  const { products, fetchProductPage, currentPage, isLoading, isLastPage, isAbleFetchNextPage } = useProducts();

  const ref = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useInfiniteScroll({ threshold: 0.25, rootMargin: "80px" }, ref);

  const category = useCategorySelect.selected;
  const sort = useSortSelect.selected;

  useEffect(() => {
    if (isIntersecting && !isLastPage) {
      fetchProductPage(category, currentPage, sort);
    }
  }, [isIntersecting]);

  useEffect(() => {
    fetchProductPage(category, 0, sort);
  }, [category, sort]);

  return (
    <>
      <Header>
        <Header.Title text="SHOP" />
        <CartBadge />
      </Header>
      <S.Wrapper>
        <S.ItemInfoWrapper>
          <TextBox type="xLarge" text="bpple 상품 목록" />
          <S.SelectBoxWrapper>
            <SelectBox selectorHook={useCategorySelect} optionsContents={Object.keys(CATEGORY)} />
            <SelectBox selectorHook={useSortSelect} optionsContents={Object.keys(SORT)} />
          </S.SelectBoxWrapper>
        </S.ItemInfoWrapper>
        <ItemCardList products={products} />
        {isAbleFetchNextPage && <div ref={ref}></div>}
        {isLoading && <ItemCartListSkeleton />}
      </S.Wrapper>
    </>
  );
};

export default ProductListPage;
