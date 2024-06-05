import CartBadge from "@/components/CartBadge";
import Header from "@/components/Header";
import TextBox from "@/components/_common/TextBox";
import SelectBox from "@/components/SelectBox";
import { CATEGORY, Category, SORT, Sort } from "@/constants/selectOption";
import useSelect from "@/hooks/useSelect";
import { useEffect, useRef } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import ItemCartListSkeleton from "@/components/ItemCardList/Skeleton";
import TopButton from "@/components/_common/TopButton";
import * as S from "@/pages/productListPage/style";
import ItemCardList from "@/components/ItemCardList";
import useProducts from "@/hooks/useProducts";

export interface GetProductsProps {
  category: Category;
  sort: Sort;
}

const ProductListPage = () => {
  const ref = useRef<HTMLDivElement>(null);

  const useCategorySelect = useSelect<Category>("전체");
  const useSortSelect = useSelect<Sort>("낮은 가격순");

  const category = useCategorySelect.selected;
  const sort = useSortSelect.selected;

  const infiniteScrollConfig = { threshold: 0.25, rootMargin: "50px" };
  const { isIntersecting } = useInfiniteScroll(infiniteScrollConfig, ref);

  const { products, isLoading, hasNextPage, fetchNextPage } = useProducts({ isIntersecting, sort, category });

  useEffect(() => {
    fetchNextPage();
  }, [category, sort]);

  useEffect(() => {
    if (isIntersecting) {
      fetchNextPage();
    }
  }, [isIntersecting]);

  if (!products) return;

  return (
    <>
      <Header>
        <Header.Title text="SHOP" />
        <CartBadge />
        <TopButton />
      </Header>
      <S.Wrapper>
        <S.ItemInfoWrapper>
          <TextBox type="xLarge" text="bpple 상품 목록" />
          <S.SelectBoxWrapper>
            <SelectBox useSelector={useCategorySelect} optionsContents={Object.keys(CATEGORY)} />
            <SelectBox useSelector={useSortSelect} optionsContents={Object.keys(SORT)} />
          </S.SelectBoxWrapper>
        </S.ItemInfoWrapper>
        {!isLoading && <ItemCardList products={products} />}
        {hasNextPage && (
          <div ref={ref}>
            <ItemCartListSkeleton ref={ref} />
          </div>
        )}
      </S.Wrapper>
    </>
  );
};

export default ProductListPage;
