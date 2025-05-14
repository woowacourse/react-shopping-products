import { useEffect, useState } from 'react';
import Product from '../Product/Product';
import { List } from './ProductList.styles';

interface dataType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

function ProductList() {
  const [products, setProducts] = useState<dataType[]>([]);

  async function getData() {
    const response = await fetch(
      'http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/products?page=0&size=20&sort=price,asc'
    );
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    (async () => {
      try {
        const data = await getData();
        setProducts(data.content);
      } catch (e) {
        console.log(e);
      } finally {
      }
    })();
  }, []);

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
