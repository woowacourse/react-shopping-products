import Product from "./components/Product/Product";

const products = [
  {
    id: 61,
    name: "방울토마토",
    price: 50000,
    imageUrl: "https://jjfoodmarket.co.kr/data/shop/item/1671006183_l1",
    category: "식료품",
  },
  {
    id: 122,
    name: "보리쌀",
    price: 10000,
    imageUrl:
      "https://cdn.jsdelivr.net/gh/bunju20/bunju-blog-images@main/images/CleanShot%202025-05-13%20at%2016.28.12%402x.webp",
    category: "식료품",
  },
  {
    id: 124,
    name: "플라망고",
    price: 8130,
    imageUrl:
      "https://velog.velcdn.com/images/minsungje/post/c27c57cb-fcbb-4641-b72d-0e2030739ae7/image.jpg",
    category: "식료품",
  },
  {
    id: 137,
    name: "두리안",
    price: 8000,
    imageUrl:
      "https://mblogthumb-phinf.pstatic.net/MjAyMDA2MjVfMTgx/MDAxNTkzMDU4OTEwOTg4.267pjmGNi_E95ZM80LELA9T2nOlcD-qZqXu_zZy2SnEg.UkAR4ANXZjVPb4yZt3w859CCqkVpkm3ceISvw9HS4QEg.JPEG.nong-up/%EC%82%AC%EB%B3%B8_-GettyImages-1134664784.jpg?type=w800",
    category: "식료품",
  },
] as const;

function App() {
  return (
    <ul>
      {products.map((product) => (
        <Product product={product}></Product>
      ))}
    </ul>
  );
}

export default App;
