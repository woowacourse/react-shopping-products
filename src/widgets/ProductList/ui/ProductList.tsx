import { useState } from 'react';

import { ProductCard, Product, Category, SortOrder } from '@/entities/product';
import { FilterCategoryButton, FilterSortOrderButton, ALL, CartToggleButton } from '@/features/product';

import css from './ProductList.module.css';

interface ProductListProps {
  products: Product[];
  category: typeof ALL | Category;
  sortOrder: SortOrder;
  onChangeCategory: (value: typeof ALL | Category) => void;
  onChangeSortOrder: (value: SortOrder) => void;
}

export const ProductList = ({
  products,
  category,
  sortOrder,
  onChangeCategory,
  onChangeSortOrder,
}: ProductListProps) => {
  const [cartState, setCartState] = useState<{ [key: number]: boolean }>({});

  const handleCartToggle = (productId: number) => {
    setCartState((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  };

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
