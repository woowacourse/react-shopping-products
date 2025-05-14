import { useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

import styled from "@emotion/styled";

function App() {
  const [selectedProductIdList, setSelectedProductIdList] = useState<string[]>(
    []
  );

  const handleAddProduct = (event: React.MouseEvent<HTMLButtonElement>) => {
    const $product = event.currentTarget.closest("li");
    if (!$product) {
      return;
    }

    setSelectedProductIdList((prevIdList) => [...prevIdList, $product.id]);
  };

  // const handleRemoveProduct = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {};

  return (
    <Container>
      <Header></Header>
      <Main handleAddProduct={handleAddProduct}></Main>
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
