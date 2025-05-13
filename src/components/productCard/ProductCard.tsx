import {
  ProductContainer,
  ProductImage,
  ProductTitle,
  ContentContainer,
  ProductPrice,
  ButtonContainer,
} from "./ProductCard.css";
import sample from "/sample.svg";
import CartToggleButton from "./CartToggleButton";

function ProductCard() {
  return (
    <div css={ProductContainer}>
      <img css={ProductImage} src={sample}></img>
      <div css={ContentContainer}>
        <h3 css={ProductTitle}>상품이름</h3>
        <p css={ProductPrice}>35,000원</p>
      </div>
      <div css={ButtonContainer}>
        <CartToggleButton />
      </div>
    </div>
  );
}

export default ProductCard;
