import ItemCardSkeleton from "@/components/ItemCard/skeleton";
import { flexCenter } from "@/styles/common";
import styled from "styled-components";

const ItemCartListSkeleton = () => {
  return (
    <ItemCardWrapper>
      {Array.from({ length: 4 })
        .fill(0)
        .map((_, i) => (
          <ItemCardSkeleton key={i} />
        ))}
    </ItemCardWrapper>
  );
};

export default ItemCartListSkeleton;

const ItemCardWrapper = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  ${flexCenter}
`;
