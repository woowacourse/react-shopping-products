import { useEffect, useState } from "react";
import { getCartItems } from "../api/cartItem";
import getProducts from "../api/product";

import Header from "../component/feature/Header/Header";
import ProductContainer from "../component/feature/ProductContainer/ProductContainer";
import Selector from "../component/unit/Selector/Selector";
import TitleContainer from "../component/feature/TitleContainer/titleContainer";
import Toast from "../component/unit/Toast/Toast";
import {
  cartIcon,
  cartIconContainer,
  cartItemCount,
  loadingLayout,
  pageLayout,
  selectorBoxLayout,
} from "./ShopPage.style";
import { CategoryOption, FilterOption } from "../constants";
import Main from "../component/feature/Main/Main";
import { ProductType } from "../types/product";
import { CartItemType } from "../types/cartItem";

const dropdownOptions: CategoryOption[] = ["전체", "식료품", "패션잡화"];
const filterOptions: FilterOption[] = ["낮은 가격순", "높은 가격순"];

export default function ShopPage() {
  const [categoryValue, setCategoryValue] = useState<CategoryOption>("전체");
  const [filterValue, setFilterValue] = useState<FilterOption>("낮은 가격순");
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [cartItemList, setCartItemList] = useState<CartItemType[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const selectedProductCount = cartItemList.length;

  const updateCardItemList = async () => {
    (async () => {
      try {
        const response = await getCartItems({
          sortBy: "asc",
        });
        setCartItemList(response.content);
      } catch (e) {
        setIsError(true);
      }
    })();
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await getProducts({
          category: categoryValue,
          sortBy: filterValue === "높은 가격순" ? "price,desc" : "price,asc",
        });
        setProductList(response.content);
        setIsLoading(false);
      } catch (e) {
        setIsError(true);
        setIsLoading(false);
      }
    })();
  }, [filterValue, categoryValue]);

  useEffect(() => {
    updateCardItemList();
  }, []);

  return (
    <div css={pageLayout}>
      <Header>
        <p>SHOP</p>
        <div css={cartIconContainer}>
          <img
            css={cartIcon}
            src="./shopping-cart.svg"
            alt="장바구니 아이콘"
            onClick={() => {
              console.log("click");
            }}
          />
          {selectedProductCount !== 0 && (
            <div data-testid="cart-count" css={cartItemCount}>
              {selectedProductCount}
            </div>
          )}
        </div>
        {isError && (
          <Toast>오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</Toast>
        )}
      </Header>
      <Main>
        {isError ? (
          <div css={loadingLayout}>
            데이터를 가져오는데 실패했습니다. <br /> 다시 시도해주세요
          </div>
        ) : isLoading ? (
          <div css={loadingLayout}>로딩중입니다</div>
        ) : productList.length === 0 ? (
          <div css={loadingLayout}>상품목록에 상품이 없습니다.</div>
        ) : (
          <>
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
                  onSelectChange={(value: FilterOption) =>
                    setFilterValue(value)
                  }
                />
              </div>
            </TitleContainer>

            <ProductContainer
              products={productList}
              cartItemList={cartItemList}
              onChange={updateCardItemList}
            />
          </>
        )}
      </Main>
    </div>
  );
}
