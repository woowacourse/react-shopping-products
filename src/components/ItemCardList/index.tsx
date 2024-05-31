import ItemCard from "@/components/ItemCard";
import styled from "styled-components";
import { flexCenter } from "@/styles/common";
import { Product } from "@/types/products";

const ItemCardList = ({ products }: { products: Product[] }) => {
  return (
    <ItemCardWrapper>
      {products && products.map((product) => <ItemCard key={`${product.id}`} product={product} />)}
    </ItemCardWrapper>
  );
};

export default ItemCardList;

const ItemCardWrapper = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  ${flexCenter}
`;
