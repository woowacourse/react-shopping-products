import { useEffect, useState } from "react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import { Container } from "./styles/common";
import { ProductCardContainer } from "./styles/ProductCard";
import { getProducts, ProductResponse } from "./api/products";
import "./styles/reset.css";

function App() {
  const [products, setProducts] = useState<ProductResponse[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts({ page: 0, size: 20 });
        setProducts(data.content);
      } catch (error) {
        console.error("상품 목록을 불러오지 못했습니다.", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container>
      <Header />
      <ProductCardContainer>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            category={product.category}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </ProductCardContainer>
    </Container>
  );
}

export default App;
