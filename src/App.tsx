import { useEffect, useState } from "react";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

import { ProductCategory } from "./types/ProductCategory";
import { Sort } from "./types/Sort";

import fetchProductList from "./apis/product/fetchProductList";

import styled from "@emotion/styled";

const isProductCategory = (value: string): value is ProductCategory => {
  return ["전체", "식료품", "패션잡화"].includes(value);
};

const isProductSort = (value: string): value is Sort => {
  return ["price,desc", "price,asc", "id,desc", "id,asc"].includes(value);
};

function App() {
  const [productList, setProductList] = useState(null);
  const [category, setCategory] = useState<ProductCategory>("전체");
  const [sort, setSort] = useState<Sort>("price,asc");

  const handleCategory = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    if (isProductCategory(value) === false) {
      return;
    }

    setCategory(value);
  };

  const handleSort = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    if (isProductSort(value) === false) {
      return;
    }

    setSort(value);
  };

  useEffect(() => {
    (async () => {
      try {
        const { content } = await fetchProductList({
          method: "GET",
          params: {
            category,
            sort,
            page: "0",
            size: "20",
          },
        });
        setProductList(content);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [category, sort]);

  if (!productList) {
    return <div>로딩중</div>;
  }

  return (
    <Container>
      <Header></Header>
      <Main
        productList={productList}
        handleCategory={handleCategory}
        handleSort={handleSort}
      ></Main>
      ;
    </Container>
  );
}

export default App;

const Container = styled.main`
  max-width: 430px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
