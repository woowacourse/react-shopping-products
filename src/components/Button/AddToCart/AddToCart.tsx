import { AddToCartIcon } from "../../../assets";
import Button from "../../common/Button/Button";
import * as S from "./AddToCart.style";

function AddToCart() {
  return (
    <Button
      width={60}
      height={24}
      radius={4}
      color="primary"
      style={{ padding: "4px", justifyContent: "space-evenly" }}
    >
      <S.Icon src={AddToCartIcon} />
      <S.Content>담기</S.Content>
    </Button>
  );
}

export default AddToCart;
