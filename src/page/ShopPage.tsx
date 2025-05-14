import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import Selector from "../component/Selector/Selector";
import TitleContainer from "../component/TitleContainer/titleContainer";
import Body from "../component/Body/Body";
import Header from "../component/Header/Header";
import ProductContainer, {
  Product,
} from "../component/ProductContainer/ProductContainer";
import getProduct from "../api/product";

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

const cartIcon = css`
  cursor: pointer;
`;

const cartIconContainer = css`
  position: relative;
  width: fit-content;
`;

const cartItemCount = css`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  inset: 19px 0 0 20px;
  background-color: #ffffff;
  color: #000000;
  border-radius: 50%;
  font-size: 10px;
  width: 19px;
  height: 19px;
`;

export default function ShopPage() {
  const [categoryValue, setCategoryValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const [productList, setProductList] = useState<Product[]>([]);

  const dropdownOptions = ["식료품", "패션잡화"];
  const filterOptions = ["낮은 가격순", "높은 가격순"];

  const onClick = () => {
    console.log("click");
  };

  useEffect(() => {
    let sortByFilter = "";
    if (filterValue === "낮은 가격순") sortByFilter = "price,asc";
    else if (filterValue === "높은 가격순") sortByFilter = "price,desc";

    (async () => {
      try {
        const response = await getProduct({ sortBy: sortByFilter });
        setProductList(response.content);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [filterValue]);

  return (
    <div css={pageLayout}>
      <Header title="SHOP">
        <div css={cartIconContainer}>
          <img
            css={cartIcon}
            src="./shopping-cart.svg"
            alt="장바구니 아이콘"
            onClick={onClick}
          />
          {selectedProducts.length !== 0 && (
            <div css={cartItemCount}>{selectedProducts.length}</div>
          )}
        </div>
      </Header>
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
        <ProductContainer
          products={productList}
          setSelectedProducts={setSelectedProducts}
        />
      </Body>
    </div>
  );
}
