import useCartItemList from "../../hooks/useCartItemList";
import { Product } from "../../interfaces/Product";
import ProductItemTitle from "../ProductItemTitle/ProductItemTitle";
import ToggleCartItemButton from "../ToggleCartItemButton/ToggleCartItemButton";
import * as S from "./ProductItem.style";

interface ProductItemProps {
  product: Product;
}

function ProductItem({ product }: ProductItemProps) {
  const { isInCart, toggleCartItem } = useCartItemList();
  return (
    <S.ProductItem>
      <S.ProductImage src={product.imageUrl} alt={product.name} />
      <ProductItemTitle title={product.name} price={product.price} />
      <ToggleCartItemButton
        isInCart={isInCart(product.id)}
        onClick={() => toggleCartItem(product)}
      />
    </S.ProductItem>
  );
}

export default ProductItem;
