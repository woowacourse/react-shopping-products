import Button from "../common/Button/Button";
import Text from "../common/Text/Text";
import ImageBox from "../common/ImageBox/ImageBox";
import Flex from "../common/Flex/Flex";
import AddProductItemIcon from "@/assets/AddShoppingCart.svg";
// import { ReactComponent as RemoveProductItemIcon } from "@/assets/RemoveProductItemIcon.svg";

export type ProductItemProps = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

export default function ProductItem({
  id,
  name,
  price,
  imageUrl,
  category,
}: ProductItemProps) {
  return (
    <Flex gap={20}>
      <ImageBox width={182} height={112} src={imageUrl} />
      <Flex gap={8}>
        <Text size="m" weight="l">
          {name}
        </Text>
        <Text size="s">{price.toLocaleString("ko-KR")}원</Text>
      </Flex>
      <Flex
        direction="row"
        style={{ width: "100%", justifyContent: "flex-end" }}
      >
        <Button
          color="primary"
          startContent={
            <ImageBox width={16} height={16} src={AddProductItemIcon} />
          }
        >
          담기
        </Button>
      </Flex>
    </Flex>
  );
}
