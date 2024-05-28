import { ProductItem } from "../ProductItem/ProductItem";
import { StyledProductList } from "./ProductList.styled";

const products = [
  {
    id: 1,
    name: "나이키",
    price: 1000,
    imageUrl:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png",
    category: "fashion",
  },
  {
    id: 2,
    name: "아디다스",
    price: 2000,
    imageUrl: "https://sitem.ssgcdn.com/74/25/04/item/1000373042574_i1_750.jpg",
    category: "fashion",
  },
  {
    id: 1,
    name: "나이키",
    price: 1000,
    imageUrl:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png",
    category: "fashion",
  },
  {
    id: 2,
    name: "아디다스",
    price: 2000,
    imageUrl: "https://sitem.ssgcdn.com/74/25/04/item/1000373042574_i1_750.jpg",
    category: "fashion",
  },
  {
    id: 1,
    name: "나이키",
    price: 1000,
    imageUrl:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png",
    category: "fashion",
  },
  {
    id: 2,
    name: "아디다스",
    price: 2000,
    imageUrl: "https://sitem.ssgcdn.com/74/25/04/item/1000373042574_i1_750.jpg",
    category: "fashion",
  },
  {
    id: 1,
    name: "나이키",
    price: 1000,
    imageUrl:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png",
    category: "fashion",
  },
  {
    id: 2,
    name: "아디다스",
    price: 2000,
    imageUrl: "https://sitem.ssgcdn.com/74/25/04/item/1000373042574_i1_750.jpg",
    category: "fashion",
  },
  {
    id: 1,
    name: "나이키",
    price: 1000,
    imageUrl:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png",
    category: "fashion",
  },
  {
    id: 2,
    name: "아디다스",
    price: 2000,
    imageUrl: "https://sitem.ssgcdn.com/74/25/04/item/1000373042574_i1_750.jpg",
    category: "fashion",
  },
  {
    id: 1,
    name: "나이키",
    price: 1000,
    imageUrl:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png",
    category: "fashion",
  },
  {
    id: 2,
    name: "아디다스",
    price: 2000,
    imageUrl: "https://sitem.ssgcdn.com/74/25/04/item/1000373042574_i1_750.jpg",
    category: "fashion",
  },
  {
    id: 1,
    name: "나이키",
    price: 1000,
    imageUrl:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png",
    category: "fashion",
  },
  {
    id: 2,
    name: "아디다스",
    price: 2000,
    imageUrl: "https://sitem.ssgcdn.com/74/25/04/item/1000373042574_i1_750.jpg",
    category: "fashion",
  },
];

export const ProductList = () => {
  return (
    <StyledProductList>
      {products.map((product) => (
        <ProductItem imageUrl={product.imageUrl} name={product.name} price={product.price} />
      ))}
    </StyledProductList>
  );
};
