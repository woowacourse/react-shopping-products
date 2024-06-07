import * as S from './CartItem.style';
import Button from '../common/Button/Button';
import Divider from '../common/Divider/Divider';
import QuantityStepper from '../common/QuantityStepper/QuantityStepper';

const CartItem = () => {
  return (
    <S.CartItem>
      <Divider />
      <S.ItemBody>
        <S.ImageWraper>
          <S.Image src="1" />
        </S.ImageWraper>
        <S.ItemDetail>
          <S.ItemHeader>
            <S.ItemNameAndCost>
              <S.ItemName>name</S.ItemName>
              <S.ItemPrice>30,000원</S.ItemPrice>
            </S.ItemNameAndCost>
            <Button size="s" radius="s" onClick={() => {}}>
              <S.ButtonText>삭제</S.ButtonText>
            </Button>
          </S.ItemHeader>
          <QuantityStepper
            quantity={3}
            increaseQuantity={() => {}}
            decreaseQuantity={() => {}}
          />
        </S.ItemDetail>
      </S.ItemBody>
    </S.CartItem>
  );
};

export default CartItem;
