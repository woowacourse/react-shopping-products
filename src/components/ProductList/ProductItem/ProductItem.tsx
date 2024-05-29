import * as PI from "./ProductItem.style";
import CartControlButton from "../../Button/CartControlButton";

interface ProductProps {
  product: Product;
}
const ProductItem = ({ product }: ProductProps) => {
  return (
    <PI.ProductItemStyle>
      <PI.ProductImg
        src={`${product.imageUrl}`}
        alt={`${product.name} 상품 이미지`}
      />
      <PI.ProductGroup>
        <PI.ProductContent>
          <PI.ProductName>{product.name}</PI.ProductName>
          <span>{product.price.toLocaleString("ko-kr")}원</span>
        </PI.ProductContent>
        <CartControlButton onClick={() => {}} isInCart />
      </PI.ProductGroup>
    </PI.ProductItemStyle>
  );
};

export default ProductItem;
