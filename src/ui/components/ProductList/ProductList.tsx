import Product from '../Product/Product';
import { List } from './ProductList.styles';

const mockProducts = [
  { id: 1, name: '양말', price: 2000, imgSrc: './socks.png' },
  { id: 2, name: '양말', price: 2000, imgSrc: './socks.png' },
  { id: 3, name: '양말', price: 2000, imgSrc: './socks.png' },
  { id: 4, name: '양말', price: 2000, imgSrc: './socks.png' },
  { id: 5, name: '양말', price: 2000, imgSrc: './socks.png' },
  { id: 6, name: '양말', price: 2000, imgSrc: './socks.png' },
  { id: 7, name: '양말', price: 2000, imgSrc: './socks.png' },
  { id: 8, name: '양말', price: 2000, imgSrc: './socks.png' },
  { id: 9, name: '양말', price: 2000, imgSrc: './socks.png' },
  { id: 10, name: '양말', price: 2000, imgSrc: './socks.png' },
  { id: 11, name: '양말', price: 2000, imgSrc: './socks.png' },
  { id: 12, name: '양말', price: 2000, imgSrc: './socks.png' },
  { id: 13, name: '양말', price: 2000, imgSrc: './socks.png' },
  { id: 14, name: '양말', price: 2000, imgSrc: './socks.png' },
  { id: 15, name: '양말', price: 2000, imgSrc: './socks.png' },
  { id: 16, name: '양말', price: 2000, imgSrc: './socks.png' },
  { id: 17, name: '양말', price: 2000, imgSrc: './socks.png' },
  { id: 18, name: '양말', price: 2000, imgSrc: './socks.png' },
  { id: 19, name: '양말', price: 2000, imgSrc: './socks.png' },
  { id: 20, name: '양말', price: 2000, imgSrc: './socks.png' },
];

function ProductList() {
  return (
    <List>
      {mockProducts.map((item) => (
        <Product
          key={item.id}
          name={item.name}
          price={item.price}
          imgSrc={item.imgSrc}
        ></Product>
      ))}
    </List>
  );
}

export default ProductList;
