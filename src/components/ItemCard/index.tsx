import ItemInfo from "@/components/ItemInfo";
import * as S from "@/components/ItemCard/style";
import { memo } from "react";
import QuantityButtonMemo from "@/components/QuantityButton";

interface ItemCardProps {
  name: string;
  price: number;
  imageUrl: string;
  id: number;
}

const ItemCard = ({ name, price, imageUrl, id }: ItemCardProps) => {
  return (
    <S.Wrapper>
      <S.Image $imgUrl={imageUrl} />
      <ItemInfo name={name} price={price} />
      <S.ButtonWrapper>
        <QuantityButtonMemo id={id} />
      </S.ButtonWrapper>
    </S.Wrapper>
  );
};

const MemoItemCard = memo(ItemCard);
export default MemoItemCard;
