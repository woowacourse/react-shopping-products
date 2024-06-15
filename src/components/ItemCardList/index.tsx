import styled from "styled-components";
import { flexCenter } from "@/styles/common";
import { Product } from "@/types/products";
import MemoItemCard from "@/components/ItemCard";

const ItemCardList = ({ products }: { products: Product[] }) => {
  return (
    <ItemCardWrapper>
      {products &&
        products.map((product, index) => {
          const { name, price, imageUrl, id } = product;
          return <MemoItemCard key={`${product.id}-${index}`} name={name} price={price} imageUrl={imageUrl} id={id} />;
        })}
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
