import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import getProduct from "../api/product";
import Body from "../component/Body/Body";
import Header from "../component/Header/Header";
import ProductContainer, {
  Product,
} from "../component/ProductContainer/ProductContainer";
import Selector from "../component/Selector/Selector";
import TitleContainer from "../component/TitleContainer/titleContainer";
import { getCartItem } from "../api/cartItem";
import Toast from "../component/Toast/Toast";

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

interface ProductItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}
export interface CartItem {
  id: number;
  quantity: number;
  product: ProductItem;
}

export type CategoryOption = "전체" | "식료품" | "패션잡화";
export type FilterOption = "낮은 가격순" | "높은 가격순";
export type sortOption = "price,asc" | "price,desc";

export default function ShopPage() {
  const [categoryValue, setCategoryValue] = useState<CategoryOption>("전체");
  const [filterValue, setFilterValue] = useState<FilterOption>("낮은 가격순");
  const [selectedProducts, setSelectedProducts] = useState<number>(0);
  const [productList, setProductList] = useState<Product[]>([]);
  const [cartItemList, setCartItemList] = useState<CartItem[]>([]);
  const [isError, setIsError] = useState(false);

  const dropdownOptions: CategoryOption[] = ["전체", "식료품", "패션잡화"];
  const filterOptions: FilterOption[] = ["낮은 가격순", "높은 가격순"];

  const updateCardItemList = async () => {
    (async () => {
      try {
        const response = await getCartItem({
          sortBy: "asc",
        });
        setSelectedProducts(response.content.length);
        setCartItemList(response.content);
      } catch (e) {
        setIsError(true);
      }
    })();
  };

  useEffect(() => {
    let sortByFilter: sortOption = "price,asc";
    if (filterValue === "높은 가격순") sortByFilter = "price,desc";
    (async () => {
      try {
        const response = await getProduct({
          category: categoryValue,
          sortBy: sortByFilter,
        });
        setProductList(response.content);
      } catch (e) {
        setIsError(true);
      }
    })();
  }, [filterValue, categoryValue]);

  useEffect(() => {
    updateCardItemList();
  }, []);

  return (
    <div css={pageLayout}>
      <Header title="SHOP">
        <div css={cartIconContainer}>
          <img
            css={cartIcon}
            src="./shopping-cart.svg"
            alt="장바구니 아이콘"
            onClick={() => {
              console.log("click");
            }}
          />
          {selectedProducts !== 0 && (
            <div css={cartItemCount}>{selectedProducts}</div>
          )}
        </div>
        {isError && (
          <Toast>오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</Toast>
        )}
      </Header>
      <Body>
        <TitleContainer title="bpple 상품 목록">
          <div css={selectorBoxLayout}>
            <Selector
              dropDownOptions={dropdownOptions}
              placeholder="전체"
              onSelectChange={(value: CategoryOption) =>
                setCategoryValue(value)
              }
            />
            <Selector
              dropDownOptions={filterOptions}
              placeholder="낮은 가격순"
              onSelectChange={(value: FilterOption) => setFilterValue(value)}
            />
          </div>
        </TitleContainer>
        <ProductContainer
          products={productList}
          cartItemList={cartItemList}
          onChange={updateCardItemList}
        />
      </Body>
    </div>
  );
}
