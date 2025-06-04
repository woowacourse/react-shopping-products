import * as S from "../../styles/Product/ProductList.styles";
import ProductItem from "./ProductItem";
import { useCartApi } from "../../domain/contexts/CartApiContext";

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  quantity: number;
};

interface ProductListProps {
  productList: Product[];
}

export default function ProductList({ productList }: ProductListProps) {
  const { cartData, refetchCart } = useCartApi();
  const cartItems = cartData ?? [];

  return (
    <S.Ul>
      {productList.map((item) => (
        <ProductItem
          key={item.id}
          {...item}
          cartItems={cartItems}
          refetch={refetchCart}
        />
      ))}
    </S.Ul>
  );
}
