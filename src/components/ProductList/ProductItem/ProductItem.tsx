import * as PI from "./ProductItem.style";
import CartControlButton from "../../Button/CartControlButton";

const ProductItem = () => {
  return (
    <PI.ProductItemStyle>
      <PI.ProductImg
        className="product-img"
        src="https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_1280.jpg"
        alt=""
      />
      <PI.ProductGroup>
        <PI.ProductContent>
          <PI.ProductName>상품 이름</PI.ProductName>
          <span>35,000원</span>
        </PI.ProductContent>
        <CartControlButton onClick={() => {}} isInCart />
      </PI.ProductGroup>
    </PI.ProductItemStyle>
  );
};

export default ProductItem;
