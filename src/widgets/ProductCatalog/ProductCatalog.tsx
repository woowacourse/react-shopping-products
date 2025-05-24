import { Products } from "../../entities/product/model/types";
import { CategoryOptionsKey, SortOptionsKey } from "../../shared/config/filter";
import * as S from "./ProductCatalog.styles";
import CategoryFilter from "./ProductControlPanel/CategoryFilter/CategoryFilter";
import ProductSorter from "./ProductControlPanel/ProductSorter/ProductSorter";
import ProductItem from "./ProductItem/ProductItem";
import ProductItemSkeleton from "./ProductItemSkeleton/ProductItemSkeleton";

interface Props {
  products: Products | null;
  isLoading: boolean;
  selectedCategory: CategoryOptionsKey;
  setSelectedCategory: React.Dispatch<React.SetStateAction<CategoryOptionsKey>>;
  selectedSortOption: SortOptionsKey;
  setSelectedSortOption: React.Dispatch<React.SetStateAction<SortOptionsKey>>;
  quantityByProductId: (productId: number) => number;
  increaseItemQuantity: (productId: number) => Promise<void>;
  decreaseItemQuantity: (productId: number) => Promise<void>;
  addProductInCart: (productId: number) => Promise<void>;
}

const ProductsSkeleton = Array.from({ length: 6 }).map((_, index) => (
  <ProductItemSkeleton key={index} />
));

const ProductCatalog = ({
  products,
  isLoading,
  selectedCategory,
  setSelectedCategory,
  selectedSortOption,
  setSelectedSortOption,
  quantityByProductId,
  increaseItemQuantity,
  decreaseItemQuantity,
  addProductInCart,
}: Props) => {
  return (
    <S.ProductCatalog>
      <S.ProductCatalogTitle>상품목록</S.ProductCatalogTitle>
      <S.ProductControlPanel>
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <ProductSorter
          selectedSortOption={selectedSortOption}
          setSelectedSortOption={setSelectedSortOption}
        />
      </S.ProductControlPanel>
      <S.ProductGrid>
        {!isLoading
          ? products?.content.map(({ id, imageUrl, name, price, quantity }) => (
              <ProductItem
                key={id}
                imageUrl={imageUrl}
                name={name}
                price={price}
                currentQuantity={quantityByProductId(id)}
                maxQuantity={quantity}
                increaseItemQuantity={() => increaseItemQuantity(id)}
                decreaseItemQuantity={() => decreaseItemQuantity(id)}
                addProductInCart={() => addProductInCart(id)}
              />
            ))
          : ProductsSkeleton}
      </S.ProductGrid>
    </S.ProductCatalog>
  );
};

export default ProductCatalog;
