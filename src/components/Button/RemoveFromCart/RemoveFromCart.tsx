import { RemoveFromCartIcon } from "../../../assets";
import Button from "../../common/Button/Button";
import * as S from "./RemoveFromCart.style";

function RemoveFromCart() {
  return (
    <Button
      width={60}
      height={24}
      radius={4}
      color="secondary"
      style={{ padding: "4px", justifyContent: "space-evenly" }}
    >
      <S.Icon src={RemoveFromCartIcon} />
      <S.Content>빼기</S.Content>
    </Button>
  );
}

export default RemoveFromCart;
