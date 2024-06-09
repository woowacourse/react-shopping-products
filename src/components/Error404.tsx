import { FlexCenter, FlexColumn } from '@/style/common.style';

import Error404Img from '@/assets/404.png';
import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';

const Error404 = () => {
  return (
    <S.CenterBox>
      <S.ErrorImg src={Error404Img} />
      <S.Text>상품 목록을 불러오는데 실패했어요</S.Text>
    </S.CenterBox>
  );
};

export default Error404;

const S = {
  CenterBox: styled.div`
    width: 100%;
    height: 500px;
    ${FlexCenter}
    ${FlexColumn}
  `,
  ErrorImg: styled.img`
    width: 100%;
  `,
  Text: styled.p`
    font-size: ${theme.fontSize.medium};
    color: ${theme.color.grey};
  `,
};
