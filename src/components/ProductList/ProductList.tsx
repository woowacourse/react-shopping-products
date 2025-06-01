import { Products } from "../../apis/types/products";
import ProductItemSkeleton from "../ProductItem/components/ProductItemSkeleton/ProductItemSkeleton";
import ProductItem from "../ProductItem/ProductItem";
import * as S from "./ProductList.styles";

type ProductListProps = {
  products: Products | null;
  isLoading: boolean;
  cartItemInfo: {
    cartId: number;
    productId: number;
    quantity: number;
  }[];
  onAddToCart: (productId: number) => void;
  onQuantityIncrease: (productId: number) => void;
  onQuantityDecrease: (productId: number) => void;
};

const ProductList = ({
  isLoading,
  products,
  cartItemInfo,
  onAddToCart,
  onQuantityIncrease,
  onQuantityDecrease,
}: ProductListProps) => {
  return (
    <S.ProductGrid>
      {!isLoading ? (
        products?.content.map(({ id, imageUrl, name, price, quantity }) => (
          <ProductItem
            key={id}
            id={id}
            quantity={quantity}
            imageUrl={imageUrl}
            name={name}
            price={price}
            cartItemInfo={cartItemInfo}
            onAddToCart={onAddToCart}
            onQuantityIncrease={onQuantityIncrease}
            onQuantityDecrease={onQuantityDecrease}
          />
        ))
      ) : (
        <>
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductItemSkeleton key={index} />
          ))}
        </>
      )}
    </S.ProductGrid>
  );
};

export default ProductList;
