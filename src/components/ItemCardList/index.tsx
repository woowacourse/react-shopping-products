import { useState, useEffect } from "react";
import { getProducts } from "@/apis/product";
import { Product } from "@/types/products";
import ItemCard from "@/components/ItemCard";
import styled from "styled-components";
import { flexCenter } from "@/styles/common";

const ItemCardList = () => {
  const [cartItems, setCartItems] = useState<Product[]>();

  const fetchData = async () => {
    const res = await getProducts();
    setCartItems(res.content);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ItemCardWrapper>
      {cartItems && cartItems.map((cartItem) => <ItemCard key={cartItem.id} product={cartItem} />)}
    </ItemCardWrapper>
  );
};

export default ItemCardList;

const ItemCardWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  ${flexCenter}
`;
