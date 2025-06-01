import getShoppingCart from "../../api/shoppingCart/getShoppingCart";
import { useAPI } from "../../domain/contexts/APIContext";
import * as S from "../../styles/Product/ProductList.styles";
import ProductItem from "./ProductItem";

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
  const { data: cartItems, refetch } = useAPI({
    fetcher: () => getShoppingCart(),
    name: "cart",
  });

  return (
    <S.Ul>
      {productList.map((item) => {
        return (
          <ProductItem
            key={item.id}
            {...item}
            cartItems={cartItems.content}
            refetch={refetch}
          />
        );
      })}
    </S.Ul>
  );
}
