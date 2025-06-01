import {
  ProductContainer,
  ProductImage,
  ProductTitle,
  ContentContainer,
  ProductPrice,
  ButtonContainer,
  SoldOutText,
} from "./ProductCard.css";
import CartToggleButton from "../cartButton/CartButton";
import { useCartProduct } from "../../hooks/useCartProduct";
import { ProductPageResponse } from "../../types/response.types";

interface ProductCardProps {
  product: ProductPageResponse["content"][number];
  isToggled: boolean;
  isSoldOut: boolean;
  setToggle: (value: boolean) => void;
}

function ProductCard({
  product,
  isToggled,
  isSoldOut,
  setToggle,
}: ProductCardProps) {
  const { cartItemIds } = useCartProduct();
  const cartMatch = cartItemIds.find((item) => item.productId === product.id);

  return (
    <div css={ProductContainer}>
      <img
        css={ProductImage}
        src={product.imageUrl || "/fallBack.png"}
        alt="상품 이미지"
        onError={(e) => {
          e.currentTarget.src = "/fallBack.png";
        }}
      />
      {isSoldOut && <p css={SoldOutText}>품절</p>}
      <div css={ContentContainer}>
        <h3 css={ProductTitle}>{product.name}</h3>
        <p css={ProductPrice}>{product.price.toLocaleString()}원</p>
      </div>
      <div css={ButtonContainer}>
        <CartToggleButton
          productId={product.id}
          cartId={cartMatch?.cartId}
          cartAmount={cartItemIds.length}
          productQuantity={product.quantity}
          quantity={cartMatch?.quantity}
          isToggled={isToggled}
          setToggle={setToggle}
        />
      </div>
    </div>
  );
}

export default ProductCard;
