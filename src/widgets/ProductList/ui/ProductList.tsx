import { useState } from 'react';

import { ProductCard, Product, Category, SortOrder } from '@/entities/product';
import {
  FilterCategoryButton,
  FilterSortOrderButton,
  DEFAULT_CATEGORY,
  DEFAULT_SORT_ORDER,
  ALL,
} from '@/features/product';
import { CartToggleButton } from '@/features/product/ui/CartToggleButton/CartToggleButton';

import css from './ProductList.module.css';

interface ProductListProps {
  products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
  const [cartState, setCartState] = useState<{ [key: number]: boolean }>({});
  const [category, setCategory] = useState<typeof ALL | Category>(DEFAULT_CATEGORY);
  const [sortOrder, setSortOrder] = useState<SortOrder>(DEFAULT_SORT_ORDER);

  const handleCartToggle = (productId: number) => {
    setCartState((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  };

  return (
    <div className={css.productListContainer}>
      <div className={css.filterWrapper}>
        <FilterCategoryButton value={category} onChange={setCategory} />
        <FilterSortOrderButton value={sortOrder} onChange={setSortOrder} />
      </div>
      <div className={css.productList}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            actionSlot={
              <CartToggleButton
                isInCart={cartState[product.id] ?? false}
                onClick={() => handleCartToggle(product.id)}
              />
            }
          />
        ))}
      </div>
    </div>
  );
};
