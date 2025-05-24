import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import getProducts from "../api/product";
import CartProductContainer from "../component/feature/CartProductContainer/CartProductContainer";
import { Modal } from "../component/feature/Modal/Modal";
import ProductContainer from "../component/feature/ProductContainer/ProductContainer";
import TitleContainer from "../component/feature/TitleContainer/titleContainer";
import Header from "../component/layout/Header/Header";
import Main from "../component/layout/Main/Main";
import Button from "../component/unit/Button/Button";
import Selector from "../component/unit/Selector/Selector";
import Toast from "../component/unit/Toast/Toast";
import { CategoryOption, FilterOption } from "../constants";
import { useCartContext } from "../hook/CartContext";
import { ProductType } from "../types/product";
import {
  cartIcon,
  cartIconContainer,
  cartItemCount,
  loadingLayout,
  pageLayout,
  selectorBoxLayout,
} from "./ShopPage.style";

const dropdownOptions: CategoryOption[] = ["전체", "식료품", "패션잡화"];
const filterOptions: FilterOption[] = ["낮은 가격순", "높은 가격순"];

export default function ShopPage() {
  const [categoryValue, setCategoryValue] = useState<CategoryOption>("전체");
  const [filterValue, setFilterValue] = useState<FilterOption>("낮은 가격순");
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const { cartItemList, dispatch } = useCartContext();

  const selectedProductCount = cartItemList.length;

  const handleClose = () => {
    setIsOpen(false);
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

  return (
    <div
      css={css`
        position: relative;
        width: 430px;
      `}
    >
      <div css={pageLayout}>
        <Header>
          <p>SHOP</p>
          <div css={cartIconContainer}>
            <img
              css={cartIcon}
              src="./shopping-cart.svg"
              alt="장바구니 아이콘"
              onClick={() => {
                setIsOpen(true);
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
                onChange={() => dispatch({ type: "update" })}
              />
            </>
          )}
        </Main>
      </div>
      <Modal
        isOpen={isOpen}
        title="장바구니"
        handleClose={handleClose}
        footer={
          <Button style="primary" onClick={handleClose} size="full">
            닫기
          </Button>
        }
      >
        {cartItemList.length === 0 ? (
          <div>
            장바구니에 추가된 목록이 없습니다. <br /> 상품을 먼저 추가해주세요
          </div>
        ) : (
          <CartProductContainer productList={productList} />
        )}
      </Modal>
    </div>
  );
}
