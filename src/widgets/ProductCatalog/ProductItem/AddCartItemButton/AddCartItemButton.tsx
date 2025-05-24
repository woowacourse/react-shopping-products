import * as S from "./AddCartItemButton.styles";
import AddCart from "/add-cart.svg";

interface Props extends React.ComponentProps<"button"> {}

const AddCartItemButton = ({ disabled, ...props }: Props) => {
  return (
    <S.AddCartItemButton {...props} disabled={disabled}>
      <img src={AddCart} alt="add-cart" />
      <S.Text>{disabled ? "품절" : "담기"}</S.Text>
    </S.AddCartItemButton>
  );
};

export default AddCartItemButton;
