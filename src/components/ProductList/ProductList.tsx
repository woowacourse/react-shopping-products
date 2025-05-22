import { Products } from "../../apis/types/products";
import ProductItemSkeleton from "../ProductItem/components/ProductItemSkeleton/ProductItemSkeleton";
import ProductItem from "../ProductItem/ProductItem";
import * as S from "./ProductList.styles";

type ProductListProps = {
  products: Products | null;
  isLoading: boolean;
  cartItemIds: {
    cartId: number;
    productId: number;
  }[];
  handleCartItemToggle: (productId: number) => Promise<void>;
};

const ProductList = ({
  isLoading,
  products,
  cartItemIds,
  handleCartItemToggle,
}: ProductListProps) => {
  return (
    <S.ProductGrid>
      {!isLoading ? (
        products?.content.map(({ id, imageUrl, name, price }) => (
          <ProductItem
            key={id}
            imageUrl={imageUrl}
            name={name}
            price={price}
            isAdd={cartItemIds.some(
              (productInfo) => productInfo.productId === id
            )}
            handleCartItemToggle={() => handleCartItemToggle(id)}
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
