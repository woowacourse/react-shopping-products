import { useEffect, useState } from 'react';
import Product from '../Product/Product';
import { List } from './ProductList.styles';
import { getProduct } from '../../../api/product';
import { ProductType, SortType } from '../../../types/product';

interface ProductListProps {
  sort: SortType;
}

function ProductList({ sort }: ProductListProps) {
  const [products, setProducts] = useState<ProductType[]>([]);

  const mappedSortType = sort === '낮은 가격 순' ? 'asc' : 'desc';

  useEffect(() => {
    (async () => {
      try {
        const data = await getProduct(mappedSortType);
        setProducts(data.content);
      } catch (e) {
        console.log(e);
      } finally {
      }
    })();
  }, [sort]);

  return (
    <List>
      {products.map((item) => (
        <Product
          key={item.id}
          name={item.name}
          price={item.price}
          imgSrc={item.imageUrl}
        ></Product>
      ))}
    </List>
  );
}

export default ProductList;
