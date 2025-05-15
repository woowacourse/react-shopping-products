import { useState, useEffect } from 'react';
import { ProductTypes } from '../../types/ProductTypes';
import ProductList from './ProductList';
import ProductListToolbar from './ProductListToolbar';
import getProducts from '../../api/getProducts';
import { CartItemTypes } from '../../types/CartItemType';

interface ProductListContainerProps {
  cartItems: CartItemTypes[];
  updateCartItems: () => void;
  getMatchCartItem: (id: number) => CartItemTypes | undefined;
}

export default function ProductListContainer({
  cartItems,
  updateCartItems,
  getMatchCartItem,
}: ProductListContainerProps) {
  const [products, setProducts] = useState<ProductTypes[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsData = await getProducts();
        const productsContent = productsData.content;
        setProducts(productsContent);
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
      <ProductListToolbar setProducts={setProducts} />
      <ProductList
        productList={products}
        updateCartItems={updateCartItems}
        getMatchCartItem={getMatchCartItem}
      />
    </>
  );
}
