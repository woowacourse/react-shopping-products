import { Product } from "../../interfaces/Product";
import ProductItemTitle from "../ProductItemTitle/ProductItemTitle";
import ToggleCartItemButton from "../ToggleCartItemButton/ToggleCartItemButton";
import * as S from "./ProductItem.style";

interface ProductItemProps {
  product: Product;
  isInCart: boolean;
  toggleCartItem: (product: Product) => void;
}

function ProductItem({ product, isInCart, toggleCartItem }: ProductItemProps) {
  return (
    <S.ProductItem>
      <S.ProductImage src={product.imageUrl} alt={product.name} />
      <S.ProductDescription>
        <ProductItemTitle title={product.name} price={product.price} />
        <S.ToggleCartItemButtonWrapper>
          <ToggleCartItemButton
            isInCart={isInCart}
            onClick={() => toggleCartItem(product)}
          />
        </S.ToggleCartItemButtonWrapper>
      </S.ProductDescription>
    </S.ProductItem>
  );
}

export default ProductItem;
