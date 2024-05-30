import styled, { keyframes } from "styled-components";
import ProductItem from "./ProductItem";
import Select from "./Select";
import useProducts from "../hooks/useProducts";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import ShopHeader from "./ShopHeader";
import ErrorToast from "./ErrorToast";
import useToast from "../hooks/useToast";
import { useEffect } from "react";

const CATEGORY_OPTIONS = [
  { value: "all", label: "전체" },
  { value: "electronics", label: "전자제품" },
  { value: "books", label: "도서" },
  { value: "fashion", label: "패션" },
  {
    value: "kitchen",
    label: "주방용품",
  },
  { value: "fitness", label: "운동기구" },
];

const PRICE_SORT_OPTIONS = [
  { value: "asc", label: "낮은 가격순" },
  { value: "desc", label: "높은 가격순" },
];

const ProductList = () => {
  const { products, loading, error, fetchNextPage, resetPage, setCategoryFilter, setPriceSort } =
    useProducts();
  const { isOpenToast, showToast } = useToast();

  useEffect(() => {
    if (error) {
      showToast();
    }
  }, [error]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!loading) {
      resetPage();
      setCategoryFilter(e.target.value);
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!loading) {
      resetPage();
      setPriceSort(e.target.value as "asc" | "desc");
    }
  };

  const handleIntersection: IntersectionObserverCallback = (entry) => {
    if (entry[0].isIntersecting && !loading) {
      fetchNextPage();
    }
  };

  const { setTarget } = useIntersectionObserver<HTMLDivElement>(handleIntersection);

  return (
    <>
      <S.Container>
        <ShopHeader />
        {isOpenToast && <ErrorToast />}
        <S.ShopBody>
          <S.Title>bpple 상품 목록</S.Title>
          <S.SelectContainer>
            <Select onChange={handleCategoryChange} options={CATEGORY_OPTIONS} />
            <Select onChange={handleSortChange} options={PRICE_SORT_OPTIONS} />
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
            {loading && <S.Spinner />}
            <div ref={setTarget}></div>
          </S.ItemContainer>
        </S.ShopBody>
      </S.Container>
    </>
  );
};

export default ProductList;

const rotate360 = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

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
    gap: 2rem 1.6rem;
    margin-top: 1.1rem;
  `,

  Spinner: styled.div`
    animation: ${rotate360} 1s linear infinite;
    transform: translateZ(0);

    border-top: 3px solid #d4d4d4;
    border-right: 3px solid #d4d4d4;
    border-bottom: 3px solid #d4d4d4;
    border-left: 6px solid black;
    background: transparent;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin: 0 auto;
  `,
};
