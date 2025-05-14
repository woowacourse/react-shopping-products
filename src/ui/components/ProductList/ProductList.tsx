import { useEffect, useMemo, useState } from 'react';
import Product from '../Product/Product';
import { List } from './ProductList.styles';
import { getProduct } from '../../../api/product';
import { ProductType, SortType, CategoryType } from '../../../types/product';

interface ProductListProps {
  sort: SortType;
  category: CategoryType;
  cart: any;
}

function ProductList({ sort, category, cart }: ProductListProps) {
  const [products, setProducts] = useState<ProductType[]>([]);

  const mappedSortType = sort === '낮은 가격 순' ? 'asc' : 'desc';

  useEffect(() => {
    console.log('effect');
    (async () => {
      try {
        const data = await getProduct(mappedSortType);
        const filteredCategory = data.content.filter(
          (item: ProductType) =>
            category === '전체' || item.category === category
        );

        if (cart && cart.cart.content !== null) {
          console.log('content:', cart.cart.content);

          const cartProductIds = cart.cart.content.map(
            (item) => item.product.id
          );

          const cartAwareProducts = filteredCategory.map((product) => ({
            ...product,
            isInCart: cartProductIds.includes(product.id),
          }));

          // console.log(cartAwareProducts);

          setProducts(cartAwareProducts);
        }
      } catch (e) {
        console.error(e);
      } finally {
      }
    })();
  }, [sort, category, cart]);

  return (
    <List>
      {products.map((item) => (
        <Product
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          imgSrc={item.imageUrl}
          isInCart={item.isInCart}
          cart={cart}
        />
      ))}
    </List>
  );
}

export default ProductList;
