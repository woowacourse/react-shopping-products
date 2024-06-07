import CartBadge from "@/components/CartBadge";
import Header from "@/components/Header";
import TextBox from "@/components/_common/TextBox";
import SelectBox from "@/components/SelectBox";
import { CATEGORY, Category, SORT, Sort } from "@/constants/selectOption";
import useSelect from "@/hooks/useSelect";
import { useEffect, useRef, useState } from "react";
import useIntersection from "@/hooks/useIntersection";
import ItemCartListSkeleton from "@/components/ItemCardList/Skeleton";
import TopButton from "@/components/_common/TopButton";
import * as S from "@/pages/productListPage/style";
import ItemCardList from "@/components/ItemCardList";
import useInfiniteFilteredProducts from "@/hooks/server/useInfiniteFilteredProducts";
import CartModal from "@/pages/cartModal";
import { useCartItemsQuery } from "@/hooks/server/useCartItems";

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
  const { isIntersecting } = useIntersection(infiniteScrollConfig, ref);

  const { data: cartItems } = useCartItemsQuery();

  const cartItemLength = cartItems?.length || 0;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const {
    fetchNextPage,
    data: products,
    isLoading,
    hasNextPage,
  } = useInfiniteFilteredProducts({
    category,
    sort,
  });

  useEffect(() => {
    if (isIntersecting) {
      fetchNextPage();
    }
  }, [isIntersecting]);

  return (
    <>
      <Header>
        <Header.Title text="SHOP" />
        <CartBadge cartItemLength={cartItemLength} onClick={onOpenModal} />
        <TopButton />
      </Header>
      <S.Wrapper>
        <S.ItemInfoWrapper>
          <TextBox type="xLarge" text="bpple 상품 목록" />
          <S.SelectBoxWrapper>
            <SelectBox useSelector={useCategorySelect} optionsContents={Object.keys(CATEGORY)} />
            <SelectBox useSelector={useSortSelect} optionsContents={Object.keys(SORT)} />
          </S.SelectBoxWrapper>
          {isModalOpen && cartItems && <CartModal onCloseModal={onCloseModal} cartItems={cartItems} />}
        </S.ItemInfoWrapper>
        {!isLoading && products && <ItemCardList products={products.pages} cartItems={cartItems!} />}
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
