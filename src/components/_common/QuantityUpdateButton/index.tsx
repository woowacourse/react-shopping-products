import Icon from "@/components/_common/Icon";
import * as S from "@/components/_common/QuantityUpdateButton/style";

const QuantityUpdateButton = () => {
  return (
    <S.UpdateButtonWrapper>
      <Icon kind="minus" onClick={() => {}} />
      <S.ProductQuantity>{}</S.ProductQuantity>
      <Icon kind="plus" onClick={() => {}} />
    </S.UpdateButtonWrapper>
  );
};

export default QuantityUpdateButton;
