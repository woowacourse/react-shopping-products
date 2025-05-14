import { useEffect, useState } from "react";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

import fetchProductList from "./apis/product/fetchProductList";

import styled from "@emotion/styled";

function App() {
  const [productList, setProductList] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { content } = await fetchProductList({
          method: "GET",
          params: {
            category: "전체",
            page: "0",
            size: "20",
          },
        });
        setProductList(content);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (!productList) {
    return <div>로딩중</div>;
  }

  return (
    <Container>
      <Header></Header>
      <Main productList={productList}></Main>;
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
