import { useState, useEffect } from 'react';
import { ProductTypes } from '../../types/ProductTypes';
import ProductList from './ProductList';
import ProductListToolbar from './ProductListToolbar';
import getProducts from '../../api/getProducts';
import { CartItemTypes } from '../../types/CartItemType';

interface ProductListContainerProps {
  cartItems: CartItemTypes[];
  isMatch: (id: number) => boolean;
}

export default function ProductListContainer({
  cartItems,
  isMatch,
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

  const updateCart = (id: number) => {
    const index = products.findIndex((e) => e.id === id);
    if (!index) return;

    const copy = [...products];
    copy[index] = { ...copy[index], isItemInCart: !copy[index].isItemInCart };
    setProducts(copy);
  };
  return (
    <>
      <ProductListToolbar setProducts={setProducts} />
      <ProductList
        productList={products}
        updateCart={updateCart}
        isMatch={isMatch}
      />
    </>
  );
}
