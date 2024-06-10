import { ProductCard } from '@/entities/product';
import { CartItemQuantityAdjuster } from '@/features/cart';
import { FilterCategoryButton, FilterSortOrderButton, AddToCartButton } from '@/features/product';
import { Product, Category, SortOrder, ALL, CartItem } from '@/shared';

import css from './ProductList.module.css';

interface ProductListProps {
  cartItems: CartItem[];
  products: Product[];
  category: typeof ALL | Category;
  sortOrder: SortOrder;
  onChangeCategory: (value: typeof ALL | Category) => void;
  onChangeSortOrder: (value: SortOrder) => void;
  onClickAddToCartButton: (id: number) => void;
}

export const ProductList = ({
  cartItems,
  products,
  category,
  sortOrder,
  onChangeCategory,
  onChangeSortOrder,
  onClickAddToCartButton,
}: ProductListProps) => {
  return (
    <div className={css.productListContainer}>
      <div className={css.filterWrapper}>
        <FilterCategoryButton value={category} onChange={onChangeCategory} />
        <FilterSortOrderButton value={sortOrder} onChange={onChangeSortOrder} />
      </div>
      <div className={css.productList}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            actionSlot={
              cartItems.filter(({ id }) => id === product.id) ? (
                <CartItemQuantityAdjuster
                  id={product.id}
                  quantity={cartItems.filter(({ id }) => id === product.id)[0].quantity}
                />
              ) : (
                <AddToCartButton onClick={() => onClickAddToCartButton(product.id)} />
              )
            }
          />
        ))}
      </div>
    </div>
  );
};
