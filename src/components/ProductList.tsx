import styled from "styled-components";
import ProductItem from "./ProductItem";
import Select from "./common/Select";
import ShopHeader from "./ShopHeader";
import useProducts from "../hooks/useProducts";
import { ErrorToastContext } from "../store/errorToastContext";
import { useContext, useEffect } from "react";
import {
  CATEGORY_SELECT_OPTIONS,
  PRICE_SORT_SELECT_OPTIONS,
  SORT_OPTIONS,
} from "../constants/products";
import { isIncludedInList } from "../utils/isIncludedInList";
import { SortOption } from "../types/sortOption";
import LoadingSpinner from "./common/LoadingSpinner";
import { IntersectionDetector } from "./common/IntersectionDetector";

const ProductList = () => {
  const { products, loading, error, fetchNextPage, resetPage, setCategoryFilter, setPriceSort } =
    useProducts();
  const { showErrorToast } = useContext(ErrorToastContext);

  useEffect(() => {
    if (error) {
      showErrorToast("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  }, [error]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!loading) {
      resetPage();
      setCategoryFilter(e.target.value);
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!loading && isIncludedInList<SortOption>(value, Object.values(SORT_OPTIONS))) {
      resetPage();
      setPriceSort(value);
    }
  };

  return (
    <>
      <S.Container>
        <ShopHeader />
        <S.ShopBody>
          <S.Title>bpple 상품 목록</S.Title>
          <S.SelectContainer>
            <Select onChange={handleCategoryChange} options={CATEGORY_SELECT_OPTIONS} />
            <Select onChange={handleSortChange} options={PRICE_SORT_SELECT_OPTIONS} />
          </S.SelectContainer>
          <S.ItemContainer>
            {products.map(({ id, name, price, imageUrl }) => (
              <ProductItem
                key={crypto.randomUUID()}
                id={id}
                name={name}
                price={price}
                imageUrl={imageUrl}
              />
            ))}
            {loading && <LoadingSpinner />}
            <IntersectionDetector onIntersected={fetchNextPage} />
          </S.ItemContainer>
        </S.ShopBody>
      </S.Container>
    </>
  );
};

export default ProductList;

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
  SelectContainer: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  ItemContainer: styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex: 1 0 100%;
    gap: 2.6rem 1.6rem;
    margin-top: 1.1rem;
  `,
};
