import Icon from "@/components/_common/Icon";
import * as S from "@/components/QuantityUpdateButton/style";

const QuantityUpdateButton = ({ quantity }: { quantity: number }) => {
  return (
    <S.UpdateButtonWrapper>
      <Icon kind="minus" onClick={() => {}} />
      <S.ProductQuantity>{quantity}</S.ProductQuantity>
      <Icon kind="plus" onClick={() => {}} />
    </S.UpdateButtonWrapper>
  );
};

export default QuantityUpdateButton;
