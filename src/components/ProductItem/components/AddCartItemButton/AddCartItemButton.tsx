import * as S from "./AddCartItemButton.styles";
import AddCart from "/add-cart.svg";

interface Props {
  onAdd: () => void;
}

const AddCartItemButton = ({ onAdd }: Props) => {
  return (
    <>
      <S.AddCartItemButton onClick={onAdd}>
        <img src={AddCart} alt="장바구니에서 상품 추가" />
        <S.Text>담기</S.Text>
      </S.AddCartItemButton>
    </>
  );
};

export default AddCartItemButton;
