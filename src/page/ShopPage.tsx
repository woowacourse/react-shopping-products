import { css } from "@emotion/react";
import { useState } from "react";
import Selector from "../component/Selector/Selector";
import TitleContainer from "../component/TitleContainer/titleContainer";

import Body from "../component/Body/Body";
import Header from "../component/Header/Header";
import Button from "../component/Button/Button";
import Product from "../component/Product/Product";
import ProductContainer from "../component/ProductContainer/ProductContainer";

const pageLayout = css`
  display: flex;
  flex-direction: column;
  width: 430px;
  background-color: white;
  border: 1px solid black;
`;

const selectorBoxLayout = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
  > div {
    width: 125px;
  }
`;

export default function ShopPage() {
  const [categoryValue, setCategoryValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const dropdownOptions = ["식료품", "패션잡화"];
  const filterOptions = ["낮은 가격순", "높은 가격순"];

  const onClick = () => {
    console.log("click");
  };

  return (
    <div css={pageLayout}>
      <Header title="shop"></Header>
      <Body>
        <TitleContainer title="bpple 상품 목록">
          <div css={selectorBoxLayout}>
            <Selector
              dropDownOptions={dropdownOptions}
              placeholder="전체"
              onSelectChange={(value) => setCategoryValue(value)}
            />
            <Selector
              dropDownOptions={filterOptions}
              placeholder="낮은 가격순"
              onSelectChange={(value) => setFilterValue(value)}
            />
          </div>
        </TitleContainer>
        <ProductContainer />
      </Body>
    </div>
  );
}
