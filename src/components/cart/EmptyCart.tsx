import EmptyCartImg from '@/assets/emptyCart.png';
import { FlexCenter } from '@/style/common.style';
import styled from '@emotion/styled';

const EmptyCart = () => {
  return (
    <S.ImgWrapper>
      <S.EmptyImg src={EmptyCartImg} />
    </S.ImgWrapper>
  );
};

export default EmptyCart;

const S = {
  ImgWrapper: styled.div`
    width: 100%;
    ${FlexCenter}
  `,
  EmptyImg: styled.img`
    height: 300px;
  `,
};
