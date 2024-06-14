import CartBadge from "@/components/CartBadge";
import Header from "@/components/Header";
import TextBox from "@/components/_common/TextBox";
import SelectBox from "@/components/SelectBox";
import { CATEGORY, Category, SORT, Sort } from "@/constants/selectOption";
import ItemCardList from "@/components/ItemCardList";
import useSelect from "@/hooks/useSelect";
import { useEffect } from "react";
import ItemCartListSkeleton from "@/components/ItemCardList/Skeleton";
import * as S from "@/pages/ProductListPage/style";
import InfiniteScroll from "@/components/_common/InfiniteScroll";
import useFetchProductItems from "@/hooks/useFetchProductItems";

const ProductListPage = () => {
  const useCategorySelect = useSelect<Category>("전체");
  const useSortSelect = useSelect<Sort>("낮은 가격순");

  const category = useCategorySelect.selected;
  const sort = useSortSelect.selected;

  const { data: products, hasNextPage, fetchNextPage } = useFetchProductItems(category, sort);

  const fetchScrollProduct = () => {
    if (hasNextPage) fetchNextPage();
  };

  useEffect(() => {
    fetchNextPage();
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
        {products?.pages ? (
          <InfiniteScroll fetchingFunction={fetchScrollProduct} hasNextPage={hasNextPage}>
            <ItemCardList products={products.pages} />
          </InfiniteScroll>
        ) : (
          <ItemCartListSkeleton />
        )}
      </S.Wrapper>
    </>
  );
};

export default ProductListPage;
