import {
  ProductContainer,
  ProductImage,
  ProductTitle,
  ContentContainer,
  ProductPrice,
  ButtonContainer,
} from "./ProductCard.css";
import CartToggleButton from "../cartButton/CartButton";
import { ERROR_TYPE } from "../../hooks/useError";
import { useData } from "../../hooks/useData";
import { ProductPageResponse } from "../../types/response.types";

interface ProductCardProps {
  product: ProductPageResponse["content"][number];
  setErrorTrue: (type: ERROR_TYPE) => void;
  isToggled: boolean;
  setToggle: (value: boolean) => void;
}

function ProductCard({
  product,
  setErrorTrue,
  isToggled,
  setToggle,
}: ProductCardProps) {
  const { cartItemIds } = useData();

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
      <div css={ContentContainer}>
        <h3 css={ProductTitle}>{product.name}</h3>
        <p css={ProductPrice}>{product.price.toLocaleString()}원</p>
      </div>
      <div css={ButtonContainer}>
        <CartToggleButton
          productId={product.id}
          cartId={cartMatch?.cartId}
          cartAmount={cartItemIds.length}
          isToggled={isToggled}
          setToggle={setToggle}
          setErrorTrue={setErrorTrue}
        />
      </div>
    </div>
  );
}

export default ProductCard;
