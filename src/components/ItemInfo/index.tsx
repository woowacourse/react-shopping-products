import TextBox from "@/components/_common/TextBox";

interface ItemInfoProps {
  name: string;
  description?: string;
  price: number;
}

const ItemInfo = ({ name, price }: ItemInfoProps) => {
  return (
    <>
      <TextBox text={name} type={"semiSmall"} />
      <TextBox text={`${price.toLocaleString()}원`} type={"xSmall"} />
    </>
  );
};

export default ItemInfo;
