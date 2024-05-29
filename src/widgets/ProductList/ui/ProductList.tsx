import { useState } from 'react';
import { ProductCard } from '@/entities/product';
import { CartToggleButton } from '@/features/product/ui/CartToggleButton/CartToggleButton';
import { FilterCategoryButton, FilterSortOrderButton } from '@/features/product';
import { DEFAULT_CATEGORY, DEFAULT_SORT_ORDER } from '@/features/product';
import { Product, Category, SortOrder } from '@/entities/product';

import css from './ProductList.module.css';
import { ALL } from '@/features/product';

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
