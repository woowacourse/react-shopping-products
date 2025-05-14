import { useEffect, useState } from 'react';
import Product from '../Product/Product';
import { List } from './ProductList.styles';
import { getProduct } from '../../../api/product';
import { ProductType, SortType, CategoryType } from '../../../types/product';

interface ProductListProps {
  sort: SortType;
  category: CategoryType;
}

function ProductList({ sort, category }: ProductListProps) {
  const [products, setProducts] = useState<ProductType[]>([]);

  const mappedSortType = sort === '낮은 가격 순' ? 'asc' : 'desc';

  useEffect(() => {
    (async () => {
      try {
        const data = await getProduct(mappedSortType);
        const filteredCategory = data.content.filter(
          (item: ProductType) =>
            category === '전체' || item.category === category
        );

        setProducts(filteredCategory);
      } catch (e) {
        console.error(e);
      } finally {
      }
    })();
  }, [sort, category]);

  return (
    <List>
      {products.map((item) => (
        <Product
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          imgSrc={item.imageUrl}
        ></Product>
      ))}
    </List>
  );
}

export default ProductList;
