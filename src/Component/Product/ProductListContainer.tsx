import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import getProducts from "../../api/getProducts";
import { useAPI } from "../../domain/contexts/APIContext";
import ErrorBox from "../Common/ErrorBox";
import Spinner from "../Common/Spinner";
import ProductList from "./ProductList";
import ProductListToolbar from "./ProductListToolbar";
import { StyledSpinnerWrapper } from "../../styles/Product/ProductListContainer.styles";
import { Option } from "../Common/SelectBox";

export type CategoryValue = "all" | "grocery" | "fashion";
export type SortValue = "low" | "high";

export interface SelectOption extends Option {
  param: string;
}

export const CATEGORY_OPTIONS: SelectOption[] = [
  { label: "전체", value: "all", param: "" },
  { label: "식료품", value: "grocery", param: "식료품" },
  { label: "패션잡화", value: "fashion", param: "패션잡화" },
];

export const PRICE_OPTIONS: SelectOption[] = [
  { label: "낮은 가격순", value: "low", param: "price,asc" },
  { label: "높은 가격순", value: "high", param: "price,desc" },
];

export default function ProductListContainer() {
  const [category, setCategory] = useState<CategoryValue>("all");
  const [price, setPrice] = useState<SortValue>("low");

  const categoryParam = CATEGORY_OPTIONS.find(
    (o) => o.value === category
  )!.param;
  const sortParam = PRICE_OPTIONS.find((o) => o.value === price)!.param;

  const {
    data: products,
    status,
    refetch,
  } = useAPI({
    fetcher: () =>
      getProducts(categoryParam, {
        page: 0,
        size: 20,
        sort: sortParam,
      }),
    name: "products",
  });

  useEffect(() => {
    refetch();
  }, [category, price]);

  if (status === "loading" || status === "idle") {
    return (
      <StyledSpinnerWrapper>
        <Spinner size={100} color="red" />
      </StyledSpinnerWrapper>
    );
  }

  if (status === "error") {
    return (
      <StyledDiv>
        <ErrorBox>오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</ErrorBox>
      </StyledDiv>
    );
  }

  return (
    <>
      <ProductListToolbar
        category={category}
        price={price}
        setCategory={setCategory}
        setPrice={setPrice}
      />

      <ProductList productList={products.content} />
    </>
  );
}

const StyledDiv = styled.div`
  position: absolute;
  width: 100%;
  top: 64px;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
