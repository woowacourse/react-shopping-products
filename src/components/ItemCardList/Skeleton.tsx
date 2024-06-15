import ItemCardSkeleton from "@/components/ItemCard/skeleton";
import { flexCenter } from "@/styles/common";
import { forwardRef } from "react";
import styled from "styled-components";

interface ItemCartListSkeletonProps {
  itemCount?: number;
}

const ItemCartListSkeleton = forwardRef<HTMLDivElement, ItemCartListSkeletonProps>(({ itemCount = 4 }, ref) => {
  return (
    <ItemCardWrapper ref={ref}>
      {Array.from({ length: itemCount }).map((_, i) => (
        <ItemCardSkeleton key={i} />
      ))}
    </ItemCardWrapper>
  );
});

export default ItemCartListSkeleton;

const ItemCardWrapper = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  ${flexCenter}
`;
