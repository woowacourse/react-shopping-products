import TextBox from "@/components/_common/TextBox";
import SelectBox from "@/components/SelectBox";
import { CATEGORY, Category, SORT, Sort } from "@/constants/selectOption";
import useSelect from "@/hooks/useSelect";
import { useEffect, useRef } from "react";
import useIntersection from "@/hooks/useIntersection";
import ItemCartListSkeleton from "@/components/ItemCardList/Skeleton";
import * as S from "@/pages/productListPage/style";
import ItemCardList from "@/components/ItemCardList";
import useFilteredProducts from "@/hooks/server/useFilteredProducts";
import CartModal from "@/pages/cartModal";
import { useCartItemsQuery } from "@/hooks/server/useCartItems";
import EmptyState from "@/components/_common/EmptyState";
import { ERROR_MESSAGES } from "@/constants/messages";

export interface GetProductsProps {
  category: Category;
  sort: Sort;
}

const ProductList = ({ onCloseModal, isModalOpen }: { onCloseModal: () => void; isModalOpen: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);

  const useCategorySelect = useSelect<Category>("전체");
  const useSortSelect = useSelect<Sort>("낮은 가격순");

  const category = useCategorySelect.selected;
  const sort = useSortSelect.selected;

  const infiniteScrollConfig = { threshold: 0.25, rootMargin: "50px" };
  const { isIntersecting } = useIntersection(infiniteScrollConfig, ref);

  const { data: cartItems, error: cartItemsError } = useCartItemsQuery();

  const {
    fetchNextPage,
    data: products,
    isLoading,
    hasNextPage,
    error: productError,
  } = useFilteredProducts({
    category,
    sort,
  });

  if (cartItemsError) {
    throw new Error(ERROR_MESSAGES.failGetCartItems);
  }

  if (productError) {
    throw new Error(ERROR_MESSAGES.failGetProducts);
  }

  useEffect(() => {
    if (isIntersecting) {
      fetchNextPage();
    }
  }, [isIntersecting]);

  return (
    <>
      <S.Wrapper>
        <S.ItemInfoWrapper>
          <TextBox type="xLarge" text="bpple 상품 목록" />
          <S.SelectBoxWrapper>
            <SelectBox useSelector={useCategorySelect} optionsContents={Object.keys(CATEGORY)} />
            <SelectBox useSelector={useSortSelect} optionsContents={Object.keys(SORT)} />
          </S.SelectBoxWrapper>
          {isModalOpen && cartItems && (
            <CartModal isOpenModal={isModalOpen} onCloseModal={onCloseModal} cartItems={cartItems} />
          )}
        </S.ItemInfoWrapper>
        {isLoading && <ItemCartListSkeleton itemCount={6} />}
        {!isLoading && !products && <EmptyState type="products" />}
        {!isLoading && products && <ItemCardList products={products.pages} />}
        {hasNextPage && (
          <div ref={ref}>
            <ItemCartListSkeleton ref={ref} />
          </div>
        )}
      </S.Wrapper>
    </>
  );
};

export default ProductList;
