import {
  CountContainer,
  CountControlButton,
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
              <button css={CountControlButton}>-</button>
              <p>2</p>
              <button css={CountControlButton}>+</button>
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
