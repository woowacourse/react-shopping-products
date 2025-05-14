import { ProductItemType } from "@/types/product";
import ProductItem from "./Item";
import * as S from "./ProductList.styled";
import { CartItemType, OnAddToCart, OnRemoveToCart } from "@/types/cartItem";

interface ProductListProps {
  resource: { read: () => ProductItemType[] };
  cartItems: CartItemType[];
  onAddToCart: OnAddToCart;
  onRemoveToCart: OnRemoveToCart;
}

function ProductList({
  resource,
  cartItems,
  onAddToCart,
  onRemoveToCart,
}: ProductListProps) {
  const products = resource.read();

  return (
    <S.ProductList>
      {products.map((productItem) => {
        const isAddedToCart = cartItems.some(
          ({ product }) => product.id === productItem.id
        );
        return (
          <ProductItem
            key={productItem.id}
            product={productItem}
            isAddedToCart={isAddedToCart}
            onAddToCart={onAddToCart}
            onRemoveToCart={onRemoveToCart}
          />
        );
      })}
    </S.ProductList>
  );
}

export default ProductList;
