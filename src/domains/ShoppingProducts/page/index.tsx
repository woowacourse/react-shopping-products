import { useState } from "react";
import Button from "../../../components/Button/Button";
import { Modal } from "../../../components/Modal/Modal";
import Selector from "../../../components/Selector/Selector";
import Toast from "../../../components/Toast/Toast";
import { CategoryOption, FilterOption } from "../../../constants";
import Header from "../../../containers/Header/Header";
import Main from "../../../containers/Main/Main";
import CartProductContainer from "../components/CartProductContainer/CartProductContainer";
import ProductContainer from "../components/ProductContainer/ProductContainer";
import TitleContainer from "../components/TitleContainer/titleContainer";

import { useShoppingContext } from "../context/useShoppingContext";
import {
  cartIcon,
  cartIconContainer,
  cartItemCount,
  containerLayout,
  pageLayout,
  selectorBoxLayout,
} from "./index.style";

const dropdownOptions: CategoryOption[] = ["전체", "식료품", "패션잡화"];
const filterOptions: FilterOption[] = ["낮은 가격순", "높은 가격순"];

export default function ShopPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, product, handleChangeCategory, handleChangeFilter } =
    useShoppingContext();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <div css={containerLayout}>
      <div css={pageLayout}>
        <Header>
          <p>SHOP</p>
          <div css={cartIconContainer}>
            <img
              css={cartIcon}
              src="./shopping-cart.svg"
              alt="장바구니 아이콘"
              onClick={handleOpen}
              data-testid="cart-icon"
            />
            {cart.item.length !== 0 && (
              <div data-testid="cart-count" css={cartItemCount}>
                {cart.item.length}
              </div>
            )}
          </div>
          {(cart.error || product.error) && (
            <Toast>{cart.error || product.error}</Toast>
          )}
        </Header>
        <Main>
          <>
            <TitleContainer title="bpple 상품 목록">
              <div css={selectorBoxLayout}>
                <Selector
                  dropDownOptions={dropdownOptions}
                  placeholder="전체"
                  onSelectChange={handleChangeCategory}
                />
                <Selector
                  dropDownOptions={filterOptions}
                  placeholder="낮은 가격순"
                  onSelectChange={handleChangeFilter}
                />
              </div>
            </TitleContainer>
            <ProductContainer />
          </>
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
        <CartProductContainer />
      </Modal>
    </div>
  );
}
