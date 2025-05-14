import { useState, useEffect } from 'react';
import { ProductTypes } from '../../types/ProductTypes';
import ProductList from './ProductList';
import ProductListToolbar from './ProductListToolbar';
import getProducts from '../../api/getProducts';
import { CartItemTypes } from '../../types/CartItemType';

interface ProductListContainerProps {
  cartItems: CartItemTypes[];
}

export function markItemsInCart(
  cartItems: CartItemTypes[],
  items: ProductTypes[]
) {
  const cartIds = new Set(cartItems.map((cartItem) => cartItem.id));

  return items.map((item) => ({
    ...item,
    isItemInCart: cartIds.has(item.id),
  }));
}

export default function ProductListContainer({
  cartItems,
}: ProductListContainerProps) {
  const [products, setProducts] = useState<ProductTypes[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsData = await getProducts();
        const productsContent = productsData.content;
        setProducts(markItemsInCart(cartItems, productsContent));
      } catch (e) {
        //
      } finally {
        //
      }
    }
    fetchProducts();
  }, [cartItems]);

  return (
    <>
      <ProductListToolbar setProducts={setProducts} cartItems={cartItems} />
      <ProductList productList={products} />
    </>
  );
}
