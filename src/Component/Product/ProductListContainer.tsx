import { useState } from 'react';
import { ProductTypes } from '../../types/ProductTypes';
import ProductList from './ProductList';
import ProductListToolbar from './ProductListToolbar';
import { CartItemTypes } from '../../types/CartItemType';

interface ProductListContainerProps {
  cartItems: CartItemTypes[];
}

export default function ProductListContainer({
  cartItems,
}: ProductListContainerProps) {
  const [products, setProducts] = useState<ProductTypes[]>([]);

  return (
    <>
      <ProductListToolbar />
      <ProductList productList={products} />
    </>
  );
}
