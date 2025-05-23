import CartManageButton from "../cartAddButton/CartManageButton";
import {
  CountContainer,
  DeleteButton,
  ItemContainer,
  ItemContent,
  ItemInfo,
  ItemPrice,
  ItemTitle,
  ProductImage,
} from "./CartItem.css";

function CartItem() {
  return (
    <>
      <div css={ItemContainer}>
        <div css={ItemInfo}>
          <img css={ProductImage} src="/sample.svg"></img>
          <div css={ItemContent}>
            <h3 css={ItemTitle}>상품 이름</h3>
            <p css={ItemPrice}>35,000원</p>
            <div css={CountContainer}>
              <CartManageButton
                quantity={3}
                increase={() => {}}
                decrease={() => {}}
              />
            </div>
          </div>
        </div>
        <button css={DeleteButton}>삭제</button>
      </div>
      <hr />
    </>
  );
}
export default CartItem;
