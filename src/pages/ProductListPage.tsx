import ProductCardList from "../components/ProductCardList";
import ProductListToolBar from "../components/ProductListToolBar";
import { Product } from "../types/product.type";

const ProductListPage = () => {
  const products: Product[] = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `테스트이름 ${index + 1}`,
    price: 1000 + index * 500,
    category: index % 2 ? "패션잡화" : "식료품",
    imageUrl: `/sample.png`,
    isInCart: index % 2 === 1,
  }));

  return (
    <>
      <ProductListToolBar />
      <ProductCardList products={products} />
    </>
  );
};

export default ProductListPage;
